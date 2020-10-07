const ValidateInput = (check, data) => {

    var count = 0;

    for (const key in data) {

        if (check.includes(key)) {

            count += 1;

        }

    }
    // console.log(count, Object.keys(data).length)
    if (count === Object.keys(data).length & count !== 0) {

        return true;
    } else {
        return false
    };
}

const ValidateInput2 = (check, data) => {

    var count = 0;

    for (const key in check) {

        if (key in data) {

            count += 1;

        }

    }

    if (count === Object.keys(data).length)

        return true;

    else return false;
}

module.exports.ValidateInput = ValidateInput;

module.exports.ValidateInput2 = ValidateInput2;