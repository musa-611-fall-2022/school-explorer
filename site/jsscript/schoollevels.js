function gradefun(school) {
    const gradearray = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', "12"];
    let minfound = false;
    let mingrade = null;
    let maxgrade = null;
    for(const grade of gradearray) {
        if(school[`Grade ${grade}`] === "1" && minfound === false){
            mingrade = grade;
            minfound = true;
        }
        if(school[`Grade ${grade}`] === "1"){
            maxgrade = grade;
        }
    }
    return school.gradelevel = `(${mingrade}-${maxgrade})`;
}



export{ gradefun };