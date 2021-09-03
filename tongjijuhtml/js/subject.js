var questions = QuestionJosn;
var itemList = ["A", "B", "C", "D", "E", "F"];
var activeQuestion = 0; //当前操作的考题编号
//分数
var mark = 0;
var timeState = true; //时间状态 默认为true 开启时间
var time = ''; //计时器
var now = 60;
var title = ""; //题目类型
time = setInterval(function() {
	if (timeState) {
		if (now > 0) {
			now--;
			$(".date").text(now >= 10 ? "0 : " + now : "0 : " + '0' + now)
		} else {
			clearInterval(time);
			alert("时间到了")
		}
	} else {
		now = 60
	}
}, 1000)
showQuestion(0)
//展示考卷信息
function showQuestion(id) {
	$(".question_sum").text(questions.length);
	$(".questioned").text(id + 1);
	$(".button").text("提交答案")
	activeQuestion = id;
	$(".question").find(".question_info").remove();
	var question = questions[id];
	var questionType = question.questionType;
	switch (questionType) {
		case "1":
			title = "单选题";
			break;
		case "2":
			title = "判断题";
			break;
		case "3":
			title = "多选题";
			break;

	}
	$(".question_title").html(`<strong>${title}&nbsp;&nbsp;</strong>` + question.questionTitle);
	var items = question.questionItems.split(";");
	var item = "";
	for (var i = 0; i < items.length; i++) {
		if (title == "多选题") {
			item =
				`
      <li class="question_info" id='item${i}'>
        <input type='checkbox' name='item' value='${itemList[i]}' class="mr" id='${i}'>
        <label class="" for="${i}">${itemList[i]}、${items[i]}</label>
      </li>
    `
		} else {
			item =
				`
      <li class="question_info" id='item${i}'>
        <input type='radio' name='item' value='${itemList[i]}' class="mr" id='${i}'>
        <label class="" for="${i}">${itemList[i]}、${items[i]}</label>
      </li>
    `
		}
		$(".question").append(item);
	}
	$(".question").attr("id", question.questionId);
}

function submit() {
	var text = $(".button").text();
	$(".tishi").addClass("none")
	var arr = '';
	if (text == '提交答案') {
		$('input[name="item"]').each(function() {
			var state = $(this).prop("checked");
			if (state) {
				arr = arr + $(this).val()
			}
		})
		console.log(arr);
		if (arr.length < 1) {
			alert("请选择一个答案")
			$(".tishi").removeClass("none")
		} else if (title == '多选题' && arr.length < 2) {
			alert("请选择一个以上答案")
			$(".tishi").removeClass("none")
		} else {
			var id = $(".question").attr("id");
			$('input[name="item"]').attr("disabled", "disabled")
			timeState = false;
			$(".time").css("display", "none")
			for (var i = 0; i < questions.length; i++) {
				if (id == questions[i].questionId) {
					console.log(questions[i].questionAnswer.toUpperCase());
					if (arr.toUpperCase() == questions[i].questionAnswer.toUpperCase()) {
						$(".tishi").text("恭喜你,答对了")
						$(".tishi").addClass("cur")
						mark += 10
					} else {
						$(".tishi").text("答错啦，正确答案是：" + questions[i].questionAnswer)
						$(".tishi").removeClass("cur")
					}
				}
			}
			if ((activeQuestion + 1) == questions.length) {
				$(".button").text("返回");
				$(".end").css("display", "block");
				$(".end").text('答题结束，得分：' + mark);
				timeState = false;
				$(".time").css("display", "none");
				$(".pop").show();
			} else {
				$(".button").text("下一题");
			}
		}
	} else if (text == '下一题') {
		$(".tishi").removeClass("none")
		timeState = true;
		$(".time").css("display", "block")
		if ((activeQuestion + 1) != questions.length) {
			showQuestion(activeQuestion + 1);
		} else {
			showQuestion(activeQuestion);
			$(".button").text("返回");
		}
	} else if (text == '返回') {
		window.location.href = "index.html"
	}
}

function onCancel() {
	$(".pop").hide();
}

function onConfirm() {
	alert("你点击了确认")
}
