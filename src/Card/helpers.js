// Function to cut 3 items out of an array and push it to another array until there is no more than 3 inside
export function spliceCheck(array) {
let arrContainer = [];
  for (let i = 0; i <= array.length; i=1) {
    if (array.length > 0) {
      arrContainer.push(array.splice(0, 3))
    }
  }
  return arrContainer;
}

export const a = (val) => {

  return console.log(val);
};