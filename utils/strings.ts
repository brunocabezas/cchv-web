export const stripHtmlFromString = (stringWithHtml: string): string => {
  var div = document.createElement("div");
  div.innerHTML = stringWithHtml;
  return div.innerText;
};
