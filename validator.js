
function Validator(options) {

    var selectorRules = {}
    function validate(inputFormElement,rule) {
        var errorMessege = rule.test(inputFormElement.value)
        var errorElement = inputFormElement.parentElement.querySelector(options.errorSelector);

        if(errorMessege) {
            inputFormElement.parentElement.classList.add('invalid');
            errorElement.innerText = errorMessege;
        }
        else{
            inputFormElement.parentElement.classList.remove('invalid');
            errorElement.innerText = ''
        }
    }
    var formElement = document.querySelector(options.form)
    if(formElement) {

        options.rules.forEach( function (rule) {
            var inputFormElement = formElement.querySelector(rule.selector);
            var errorElement = inputFormElement.parentElement.querySelector(options.errorSelector);

            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            }
            else {
                selectorRules[rule.selector] = [rule.test]

            }
            if(inputFormElement) {
                // khi blurr rra ngoaif
                inputFormElement.onblur = function() {
                    validate(inputFormElement,rule)

                }
                // 
                inputFormElement.oninput = function () {
                    errorElement.innerText = ''
                    inputFormElement.parentElement.classList.remove('invalid');
                }
            }
        });
        
    }   
}

Validator.isRequire = function (selector,Messege) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : Messege
        }
    }
}

Validator.isEmail = function (selector,Messege) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : Messege
        }
    }
}


Validator.isMinLength = function (selector,min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`
        }
    }
}

Validator.isConfirmPW = function(selector,getConfirm,Messege) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirm() ? undefined : Messege
        }
    }
}   