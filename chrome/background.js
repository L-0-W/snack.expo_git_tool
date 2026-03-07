let lastRequestTime = Date.now();

// Usa a API 'browser' e a permissão 'alarms'
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;
browserAPI.alarms.create('keepAlive', { periodInMinutes: 0.5 });
browserAPI.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'keepAlive') { console.log('Keep alive check'); }
});

function fetch_py(url, gitRepName) {
    try {
        fetch(`http://localhost:3000/executar?url=${encodeURIComponent(url)}&gitRepName=${encodeURIComponent(gitRepName)}`)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                console.log("Enviado para o Python com sucesso!");
            })
            .catch(error => console.error("Erro ao enviar para Python:", error.message));
    } catch (e) {
        console.error("Erro crítico:", e);
    }
}

// Ouve mensagens dos content scripts (Chrome e Firefox)
browserAPI.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "fetch_py") {
        fetch_py(message.url, message.gitRepName);
    }
});

browserAPI.webRequest.onBeforeRequest.addListener(
    function (details) {
        lastRequestTime = Date.now();
        const urlCapturada = details.url;
        console.log("Download interceptado:", urlCapturada);

        // Firefox utiliza Promises nativamente para a API do browser
        browserAPI.tabs.query({ active: true, currentWindow: true })
            .then(tabs => {
                let currentTab = tabs[0];

                if (!currentTab || !currentTab.url.includes("snack.expo.dev")) {
                    browserAPI.tabs.query({ url: "*://snack.expo.dev/*" }).then(allSnackTabs => {
                        if (allSnackTabs.length > 0) {
                            fetch_py(urlCapturada, allSnackTabs[0].title);
                        }
                    });
                } else {
                    fetch_py(urlCapturada, currentTab.title);
                }
            })
            .catch(error => console.error("Erro ao buscar abas:", error));

        return { redirectUrl: "https://snack.expo.dev" };
    },
    {
        urls: ["*://exp.host/--/api/v2/snack/download/*"]
    },
    ["blocking"]
);