let lastRequestTime = Date.now();

// Mantém o service worker vivo
chrome.alarms?.create('keepAlive', { periodInMinutes: 0.5 });

chrome.alarms?.onAlarm.addListener((alarm) => {
    if (alarm.name === 'keepAlive') {
        console.log('Keep alive check');
    }
});

function fetch_py(title_page, urlCapturada) {
    try {
        fetch(`http://localhost:3000/executar?url=${encodeURIComponent(urlCapturada+"|"+title_page)}`)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            console.log("Enviado para o Python com sucesso!");
        })
        .catch(error => {
            console.error("Erro:", error.message);
        });
    } catch (e) {
        console.error("Erro crítico:", e);
    }
}

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        lastRequestTime = Date.now();
        const urlCapturada = details.url;
        
        chrome.windows.getLastFocused().then((e) => {
        
            chrome.windows.get(e.id, { populate: true }, (j) => {
                let snackTab = j.tabs.filter(tb => tb.url != undefined ? tb.url.includes("https://snack.expo.dev/"): "")[0];
                console.log(snackTab)

                chrome.scripting.executeScript({
                    target: { tabId: snackTab.id },
                    func: () => document.title // Access the document here
                }, (results) => {
                    fetch_py(results[0].result.split(' ')[0].trim(), urlCapturada)
                });
            })
        })
    },
    { 
        urls: ["*://exp.host/--/api/v2/snack/download/*"] 
    }
);