/* eslint-disable no-useless-escape */
/* eslint-disable import/prefer-default-export */

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=-1;`;
}
