var cw = 1;

function sele_Change() {
	var ways = document.getElementById("ways");
	cw = ways.options[ways.selectedIndex].value;

	var wl = document.getElementById("warming_label");
	if(cw == 1) {
		wl.innerText = "输入手机号:"
	} else if(cw == 2) {
		wl.innerText = "输入邮箱:"
	}
}

//检查输入
function input_change(e) {
	console.log("change")
	var ei = document.getElementById("error_img");
	if(cw == 1) {
		var phone_re = /^1[34578]\d{9}$/;

		if(phone_re.test(e)) {
			ei.style.display = "none"
		} else {
			ei.style.display = "inline";
		}
	} else if(cw == 2) {
		var email_re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
		if(email_re.test(e)) {
			ei.style.display = "none"
		} else {
			ei.style.display = "inline";
		}
	}
}