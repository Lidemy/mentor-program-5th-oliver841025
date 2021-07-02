export const cssTemplate = ".card { margin-top: 12px; }";

export function getForm(className, commentsClassName) {
  return `
    <div>
        <form class="${className}">
            <div class="mb-3">
            <label class="form-label">暱稱</label>
            <input
                type="text"
                name="nickname"
                class="form-control"
            />
            <div class="mb-3">
                <label class="form-label">留言</label>
                <textarea
                class="form-control"
                name="content"
                rows="3"
                ></textarea>
            </div>
            </div>
            <button type="submit" class="btn btn-primary">提交</button>
        </form>
        <section class="${commentsClassName}"></section>
    </div>
  `;
}

export function getLoadMoreButton(className) {
  return `
    <button class="${className} btn btn-primary">載入更多</button>
`;
}
