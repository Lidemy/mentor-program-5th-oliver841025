export function escape(string) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  const reg = /[&<>"'/]/gi;
  return string.replace(reg, (match) => map[match]);
}

export function addCommentToDOM(wrapper, comment, isPrepend) {
  const commentHTML = `
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">${escape(comment.nickname)}</h5>
                      <p class="card-text">${escape(comment.content)}</p>
                  </div>
              </div>
            `;
  if (isPrepend) {
    if (!comment.nickname || !comment.content) {
      alert("please check your input");
      return;
    }
    wrapper.prepend(commentHTML);
  } else {
    wrapper.append(commentHTML);
  }
}

export function appendStyle(cssTemplate) {
  const styleElement = document.createElement("style");
  styleElement.type = "text/css";
  styleElement.appendChild(document.createTextNode(cssTemplate));
  document.head.appendChild(styleElement);
}
