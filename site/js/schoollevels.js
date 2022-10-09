function gradefun(school) {
    const gradearray = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', "12"];
    var minfound = false;
    var mingrade = null;
    var maxgrade = null;
    for(const grade of gradearray) {
        if(school[`Grade ${grade}`] === "1" && minfound === false){
            var mingrade = grade;
            var minfound = true;
        }
        if(school[`Grade ${grade}`] === "1"){
            var maxgrade = grade;
        }
    }
    return school.gradelevel = `(${mingrade}-${maxgrade})`;
}



export{ gradefun };