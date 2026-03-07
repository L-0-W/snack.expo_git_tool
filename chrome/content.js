const githubSvg = `
<svg height="24" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true" class="octicon octicon-mark-github">
    <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
</svg>
`;


function injectGithubIcon() {
  if (document.getElementById('custom-github-icon')) return;

  const iconContainer = document.createElement('div');
  iconContainer.id = 'custom-github-icon';
  iconContainer.innerHTML = githubSvg;

  iconContainer.style.position = 'fixed';
  iconContainer.style.top = '10px';
  iconContainer.style.right = '430px';
  iconContainer.style.cursor = 'pointer';
  iconContainer.style.zIndex = '9999';
  iconContainer.style.backgroundColor = 'transparent';
  iconContainer.style.borderRadius = '50%';
  iconContainer.style.padding = '8px';
  iconContainer.style.display = 'flex';
  iconContainer.style.alignItems = 'center';
  iconContainer.style.justifyContent = 'center';

  iconContainer.addEventListener('mouseover', () => {
    iconContainer.style.transform = 'scale(1.1)';
    iconContainer.style.transition = 'all 0.2s ease-in-out';
  })

  iconContainer.addEventListener('mouseout', () => {
    iconContainer.style.transform = 'scale(1)';
  })

  iconContainer.addEventListener('click', () => {
    console.log('Current URL:', window.location.href);

    const title = window.location.href.split('/').at(-1);
    const username = window.location.href.split('/').at(-2);
    const url = `https://exp.host/--/api/v2/snack/download/${username}/${title}`;

    console.log(url, title);
    chrome.runtime.sendMessage({ action: "fetch_py", url: url, gitRepName: title });
  });

  document.body.appendChild(iconContainer);
}

setTimeout(injectGithubIcon, 200);

let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setTimeout(injectGithubIcon, 1000);
  }
}).observe(document, { subtree: true, childList: true });
