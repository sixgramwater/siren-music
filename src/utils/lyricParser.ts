const getLyric = (url: string) => {
  const request = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    request.open('GET', url, true);
    request.setRequestHeader('Referrer Policy', 'no-referrer');
    request.responseType = 'blob';
    request.onload = () => {
      resolve(request.response);
    };
    request.onerror = (e) => reject(e);
    request.send();
  });
};
