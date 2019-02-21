function initialize() {
    var stroke_form = document.getElementById("stroke_form");
    // stroke_form.onsubmit = validate;
    stroke_form.onsubmit = predict;
}

////////////////////////////////////////////////////////////////////////////////////////////////////

// Bind initialize() function to onload event
onload = initialize;

////////////////////////////////////////////////////////////////////////////////////////////////////

function predict() {

    var age = document.getElementById("age").value;
    var agl = document.getElementById("agl").value;
    // var bmi = document.getElementById("bmi").value;

    var work_type = document.getElementById("work_type").value;

    // In our initial data analysis we noticed that,
    // the smoking_status data does not reflect statements made in a scientific journal
    // on the effects of smoking on having a stroke
    // We therefore opted not to use smoking_status as a feature
    // We leave it commented it out here,
    // so that we may return at a later time if we decide to use this in some way
    var smoking_status = document.getElementById("smoking_status").value;

    var has_hypertension = document.getElementById("has_hypertension").checked ? 1:0;
    var has_heart_disease = document.getElementById("has_heart_disease").checked ? 1:0;
    var ever_married = document.getElementById("ever_married").checked ? 1:0;

    // Ben,
    // Remember when we tried finding a solution to define a URL?  This is the solution I came up with.  Hope you like it
    // - Tyler

    // In our initial data analysis we noticed that,
    // the smoking_status data does not reflect statements made in a scientific journal
    // on the effects of smoking on having a stroke
    // We therefore opted not to use smoking_status as a feature
    // We leave the half-URL with smoking_status commented out here,
    // so that we may return at a later time if we decide to use this in some way
    url_half = `api/predict?age=${age}&agl=${agl}&work_type=${work_type}&smoking_status=${smoking_status}`;

    // url_half = `api/predict?age=${age}&agl=${agl}&bmi=${bmi}&work_type=${work_type}&smoking_status=${smoking_status}`;
    // url_half = `api/predict?age=${age}&agl=${agl}&bmi=${bmi}&work_type=${work_type}`;
    

    if (has_hypertension) {
        if (has_heart_disease) {
            if (ever_married) {
                url_full = url_half + "&hypertension=on&heart_disease=on&ever_married=on";
            }

            else {
                url_full = url_half + "&hypertension=on&heart_disease=on";
            }
        }

        else if (ever_married) {
            url_full = url_half + "&hypertension=on&ever_married=on";
        }

        else {
            url_full = url_half + "&hypertension=on";
        }
    }

    else if (has_heart_disease) {
        if (ever_married) {
            url_full = url_half + "&heart_disease=on&ever_married=on";
        }

        else {
            url_full = url_half + "&heart_disease=on";
        }
    }

    else if (ever_married) {
        url_full = url_half + "&ever_married=on";
    }

    else {
        url_full = url_half;
    }

    d3.json(url_full, function (data) {
    
        // This function fetches a JSON
        // They key we are interested in is "stroke_prediction"
        // This returns a list with one element
        // If this one element is a 0, the Machine Learning Model predicted the user is not as risk of having a stroke
        // If this one element is a 1, the Machine Learning Model predicted the user is at risk of having a stroke
        var prediction_number = data.stroke_prediction[0];

        if (prediction_number == [1]) {
            var prediction = "You are at risk of having a stroke." + "<br><br>" + "<img src='../static/sad_pepe.png' alt='sad frog'>";;
        }

        else if (prediction_number == [0]) {
            var prediction = "You are not at risk of having a stroke." + "<br><br>" + "<img src='../static/dancing_pepe.gif' alt='dancing frog'>";
        }

        document.getElementById("user_message").innerHTML = prediction;

    })

}


// The validate() function checks user input,
// to make sure no inappropirate data is submitted
function validate() {


    var age = document.getElementById("age").value;
    var agl = document.getElementById("agl").value;
    var bmi = document.getElementById("bmi").value;

    // console.log(age);
    // console.log(agl);
    // console.log(bmi);

    // var is_required_name_set = false;
    // var is_required_email_set = false;
    // var is_email_valid = false;

    // console.log(is_required_name_set);
    // console.log(is_required_email_set);
    // console.log(is_email_valid);

    var message = "";

    // is_required_name_set = validator(name);
    // is_required_email_set = validator(email);
    // is_email_valid = validate_email(email);

    // console.log(is_required_name_set)

    user_message = document.getElementById("result");

    // if (! Number.isInteger(age)) {
    //     message = "Please enter a whole number for your age."
    //     user_message.innerHTML = message;

    // }

    // if (is_required_name_set &&	 is_required_email_set && is_email_valid) {
    //     message = `Thank you, ${name}.  Your details have been submitted.`;
    // }

    // else if (! is_required_name_set) {
    //     message = "No name detected, please enter a name.";
    //     write_message(message);
    //     return false;
    // }

    // else if (! is_required_email_set) {
    //     message = "No email detected, please enter an email address.";
    //     write_message(message);
    //     return false;
    // }

    // else if (! is_email_valid) {
    //     message = "There is a problem with your email.  Please correct this field.";
    //     write_message(message);
    //     return false;
    // }

    // alert(message);

    // console.log(message);

}

function validator(input) {
    // console.log(`Input for validator: ${input}`)
    var is_valid = false;

    if (input.length == 0) {
        // console.log("if worked; else failed")
        is_valid = false;
    }

    else {
        // console.log("if failed; else worked")
        is_valid = true;
    }

    return is_valid;
}

function validate_email(email) {
    var is_valid = false;

    if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        is_valid = false;
    }

    else {
        is_valid = true;
    }
    
    return is_valid;
}

function write_message(text) {
    var paragraph = document.getElementById("result");

    if (paragraph.firstChild) {
        paragraph.removeChild(paragraph.firstChild);
    }

    paragraph.appendChild(document.createTextNode(text));
}