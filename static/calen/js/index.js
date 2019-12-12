function create_calendar(){
  switch( calendar["type"] ){
    case "month":
      $(".calendar_month tbody").empty();
      for(var i=0; i<calendar["value"].length; i++){
        $(".calendar_month tbody").append("<tr></tr>")
        $(".calendar_month tbody").append("<tr></tr>")
        for(var j=0; j<7; j++){
          console.log(j)
          if(calendar["value"][i][j] != 0){
            $(".calendar_month tbody > tr:nth-child("+parseInt(2*i+1)+")").append("<td class='calen_top' id="+display_time["display_year"]+"_"+display_time["display_month"]+"_"+calendar["value"][i][j]+">"+calendar["value"][i][j]+"</td>")
            $(".calendar_month tbody > tr:nth-child("+parseInt(2*i+2)+")").append("<td class='calen_bottom' id="+display_time["display_year"]+"_"+display_time["display_month"]+"_"+calendar["value"][i][j]+" onclick='create_schedule(this);'></td>")
          }else{
            $(".calendar_month tbody > tr:nth-child("+parseInt(2*i+1)+")").append("<td class='calen_top'></td>")
            $(".calendar_month tbody > tr:nth-child("+parseInt(2*i+2)+")").append("<td class='calen_bottom'></td>")
          }
        }
        bottom_height = ($(window).height()-26-56-56-(27*calendar["value"].length)) / calendar["value"].length
        $(".calen_bottom").css("height",bottom_height)
      }
      break;
    case "day":
      $(".calendar_day tbody").empty();
      $(".calendar_day tbody").append("<tr></tr>")
      for(var j=0; j<7; j++){
        $(".calendar_day tbody > tr:nth-child("+parseInt(2*i+1)+")").append("<td>"+calendar["value"][i]+"</td>")
        $(".calendar_day tbody > tr:nth-child("+parseInt(2*i)+")").append("<td></td>")
      }
      break;
  }
}

function display_year_month(year,month){
  $(".this_year_month").html(year+"年"+month+" 月")
}

function draw_today(this_year,this_month,this_date){
  $("#"+this_year+"_"+this_month+"_"+this_date).css("background-color","#8ffbff")
}

function calendar_move(element){
  data = {
    "display_date":parseInt(display_time["display_date"]),
    "display_month":parseInt(display_time["display_month"]),
    "display_year":parseInt(display_time["display_year"]),
    "type": element.value,
    "format":calendar["type"]
  }
  console.log(data)
  $.ajax({
      url: "calen/get_calendar",
      data: data,
      type:'POST',
  })
  .then(
      function (data) {
        console.log(data)
        display_time = JSON.parse(data["display_time"])
        calendar = JSON.parse(data["calendar"])
        console.log(display_time)
        console.log(calendar)
        display_year_month(display_time["display_year"],display_time["display_month"])
        create_calendar();
        draw_today(this_year,this_month,this_date);
      },
      function () {
        alert("読み込み失敗");
  });
}


function create_schedule(element){
  selected_id = element.id
  selected_date_list = selected_id.split("_")
  selected_year = selected_date_list[0]
  selected_month = selected_date_list[1]
  selected_date = selected_date_list[2]
  console.log(selected_year)
  console.log(selected_month)
  console.log(selected_date)
}


$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body input').val(recipient)
})

$(function() {
  $(".start_date").datepicker();
  console.log(this_hour)
  if(this_hour==23){
    $(".start_date").val(this_year+'/'+this_month+'/'+parseInt(this_date+1));
    start_default = this_hour - 23
  }else{
    start_default = this_hour + 1
    $(".start_date").val(this_year+'/'+this_month+'/'+this_date);
  }
  $(".finish_date").datepicker();
  if(this_hour>=22){
    finish_default = this_hour - 22
    $(".finish_date").val(this_year+'/'+this_month+'/'+parseInt(this_date+1));
  }else{
    finish_default = this_hour + 2
    $(".finish_date").val(this_year+'/'+this_month+'/'+this_date);
  }
  $('.start_time').timepicker({
    timeFormat: 'H:mm',
    interval: 60,
    minTime: '0:00',
    maxTime: '23:00',
    defaultTime: start_default+":00",
    startTime: '0:00',
    dynamic: false,
    dropdown: true,
    scrollbar: true,
    zindex: 1100
    });
  $('.finish_time').timepicker({
    timeFormat: 'H:mm',
    interval: 60,
    minTime: '0:00',
    maxTime: '23:00',
    defaultTime: finish_default+":00",
    startTime: '0:00',
    dynamic: false,
    dropdown: true,
    scrollbar: true,
    zindex: 1100
    });
  });

  function check_time(){
    start_date_list = $(".start_date").val().split("/")
    start_year = start_date_list[0]
    start_month = start_date_list[1]
    start_date = start_date_list[2]
    start_time_list = $(".start_time").val().split(":")
    start_hour = start_time_list[0]
    start_minute = start_time_list[1]
    start = new　Date(start_year,start_month,start_date,start_hour,start_minute,0)
    finish_date_list = $(".finish_date").val().split("/")
    finish_year = finish_date_list[0]
    finish_month = finish_date_list[1]
    finish_date = finish_date_list[2]
    finish_time_list = $(".finish_time").val().split(":")
    finish_hour = finish_time_list[0]
    finish_minute = finish_time_list[1]
    finish = new　Date(finish_year,finish_month,finish_date,finish_hour,finish_minute,0)
    console.log(start);
    console.log(finish);
    console.log()
    if(start > finish){
      $("#register_schedule_button").prop("disabled", true);
      $(".finish_date").addClass("error_input")
      $(".finish_time").addClass("error_input")
      alert("不適切な時間です。開始時間より終了時間が後になるようにしてください！")
    }else{
      $("#register_schedule_button").prop("disabled", false);
      $(".finish_date").removeClass("error_input")
      $(".finish_time").removeClass("error_input")
    }
  }
