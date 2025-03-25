function debounce(func, wait) {
  let timeout;
  return function(...args){
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  }
}

function throttle(func, wait) {
  let inThrottle;
  return function(...args){
    const context = this;
    if(!inThrottle){
      inThrottle = true;
      func.apply(context, args);
      setTimeout(() => inThrottle = false, wait);
    }
  }
 
}


export{
    debounce,
    throttle,
}