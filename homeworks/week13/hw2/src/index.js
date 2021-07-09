import { getComments, addComments } from "./api";
import { addCommentToDOM, appendStyle } from "./utils";
import { cssTemplate, getForm, getLoadMoreButton } from "./templates";
import $ from "jquery";

export function init(options) {
  let site_key = "";
  let apiUrl = "";
  let containerElement = null;
  let commentDOM = null;
  let before = "";
  let lastId = "";
  let loadMoreClassName;
  let commentsClassName;
  let commentsSelector;
  let formClassName;
  let formSelector;

  site_key = options.site_key;
  apiUrl = options.apiUrl;
  loadMoreClassName = `${site_key}-load-more`;
  commentsClassName = `${site_key}-comments`;
  formClassName = `${site_key}-add-comment-form`;
  commentsSelector = "." + commentsClassName;
  formSelector = "." + formClassName;

  containerElement = $(options.container);
  containerElement.append(getForm(formClassName, commentsClassName));
  appendStyle(cssTemplate);

  commentDOM = $(commentsSelector);
  getNewComments();

  commentDOM.on("click", "." + loadMoreClassName, (e) => {
    before = lastId;
    getNewComments();
  });

  $(formSelector).submit((e) => {
    e.preventDefault();
    const nicknameDOM = $(`${formSelector} input[name=nickname]`);
    const contentDOM = $(`${formSelector} textarea[name=content]`);
    const commentData = {
      site_key: site_key,
      nickname: nicknameDOM.val().trim(),
      content: contentDOM.val().trim(),
    };

    addComments(apiUrl, site_key, commentData, (data) => {
      if (!data.ok) {
        alert(data.message);
        return;
      }

      addCommentToDOM(commentDOM, commentData, true);
      // 清空輸入欄位
      nicknameDOM.val("");
      contentDOM.val("");
    });
  });

  // 拿留言
  function getNewComments() {
    const commentDOM = $(commentsSelector);
    getComments(apiUrl, site_key, before, (data) => {
      if (!data) {
        alert(data.message);
        return;
      }
      const comments = data.discussions;
      let length = comments.length;

      for (let comment of comments) {
        addCommentToDOM(commentDOM, comment);
      }
      if (length !== 0) {
        lastId = comments[length - 1].id;
        $("." + loadMoreClassName).hide();
        const loadMoreButtonHTML = getLoadMoreButton(loadMoreClassName);
        commentDOM.append(loadMoreButtonHTML);
      } else {
        $("." + loadMoreClassName).hide();
        return;
      }
    });
  }
}
