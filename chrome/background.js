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

browserAPI.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "fetch_py") {
        fetch_py(message.url, message.gitRepName);
    }
});