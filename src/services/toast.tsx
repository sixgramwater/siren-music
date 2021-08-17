let timeout: number;
let ms: number = 3000;

export const triggerTimeout = async (callback: Function) => {
  if(timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(callback, ms)
}

// models
function callToast(content: string) {
  // put: setToastContent(content)
  // put: toggleShowToast -> true

  // trigger callback until 3s later
  // yield call(triggerTimeout(callback));



}
