let lastRequestTime = Date.now();

chrome.alarms?.create('keepAlive', { periodInMinutes: 0.5 });
chrome.alarms?.onAlarm.addListener((alarm) => {
    if (alarm.name === 'keepAlive') { console.log('Keep alive check'); }
});

function fetch_py(title_page, urlCapturada) {
    try {
        fetch(`http://localhost:8080/executar?url=${encodeURIComponent(urlCapturada+"|"+title_page)}`)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            console.log("Enviado para o Python com sucesso!");
        })
        .catch(error => console.error("Erro ao enviar para Python:", error.message));
    } catch (e) {
        console.error("Erro crítico:", e);
    }
}

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        lastRequestTime = Date.now();
        const urlCapturada = details.url;
        console.log("Download interceptado:", urlCapturada);
        
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            let currentTab = tabs[0];

            if (!currentTab || !currentTab.url.includes("snack.expo.dev")) {
                chrome.tabs.query({ url: "*://snack.expo.dev/*" }, function(allSnackTabs) {
                    if (allSnackTabs.length > 0) {
                        fetch_py(allSnackTabs[0].title, urlCapturada);
                    }
                });
            } else {
                fetch_py(currentTab.title, urlCapturada);
            }

        });
        
        return { redirectUrl: "https://snack.expo.dev" }; 
    },
    { 
        urls: ["*://exp.host/--/api/v2/snack/download/*"] 
    },
    ["blocking"]
);