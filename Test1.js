const arr = [1, 2, 3, 4, 5];

arr.forEach(ele => {
    if(ele % 2 == 0){
        return;
    }
    console.log(ele);
})