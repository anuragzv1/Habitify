
//function to add new Habits
async function addNewHabit() {

    let newHabitName = document.getElementById('newHabitName').value;
    let e = document.getElementById('newHabitFreq');
    let freq = e.options[e.selectedIndex].value;


    let createUser = await fetch('/createhabit', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: newHabitName,
            freq: freq
        })
    });

    let res = await createUser.json();
    console.log(res);

    let currentD = new Date();
    let currentDate = currentD.getDate();
    let currentDay = currentD.getDay();
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    var daysBefore = [];
    //
    for (let i = 1; i <= 6; i++) {
        var date = new Date();
        var last = new Date(date.getTime() - (i * 24 * 60 * 60 * 1000));
        var day = last.getDay();
        console.log(day);
        daysBefore[i] = day;
    }
    //dynamically adding the newly created 
    let htmlString = `<div class="listitem" onclick="window.location.href='/habit?id=${res.data._id}'" >
        <div class="listtitle">${newHabitName}</div>
        <div class="list-day-container">
            <div class="listday">
                <span class="daytitle">${days[daysBefore[6]]}</span> <br>
                <span class="daynumber">${currentDate - 6}</span>
            </div>
            <div class="listday">
                <span class="daytitle">${days[daysBefore[5]]}</span> <br>
                <span class="daynumber">${currentDate - 5}</span>
            </div>
            <div class="listday">
                <span class="daytitle">${days[daysBefore[4]]}</span> <br>
                <span class="daynumber">${currentDate - 4}</span>
            </div>
            <div class="listday">
                <span class="daytitle">${days[daysBefore[3]]}</span> <br>
                <span class="daynumber">${currentDate - 3}</span>
            </div>
            <div class="listday">
                <span class="daytitle">${days[daysBefore[2]]}</span> <br>
                <span class="daynumber">${currentDate - 2}</span>
            </div>
            <div class="listday">
                <span class="daytitle">${days[daysBefore[1]]}</span> <br>
                <span class="daynumber">${currentDate - 1}</span>
            </div>
            <div class="listday">
                <span class="daytitle">${days[currentDay]}</span> <br>
                <span class="daynumber">${currentDate}</span>
            </div>
        </div>
        <div class="stats">
            <span class="best">Best: None </span>
            <span class="total">Total: None</span>
            <span class="freq">Freq: ${freq}</span>
        </div>
    </div>`

    let dynamicHabitDiv = document.createElement('div');
    dynamicHabitDiv.innerHTML = htmlString;

    document.querySelector('.new-habit-div').after(dynamicHabitDiv);

    let newHabitDiv = document.querySelector('.new-habit-div');
    newHabitDiv.style.display = "none";
}

//show the div to add a new habit
function showHabitAdd() {
    let newHabitDiv = document.querySelector('.new-habit-div');
    newHabitDiv.style.display = "flex";
}

//function to delte a habit
async function deletehabit(event , habit_id){
    console.log('delete', habit_id);
    event.stopPropagation();

    let deletedHabit = await fetch('/deletehabit', {
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            id:habit_id
        })
    });

    let deleteJson = await(deletedHabit.json());

    if(deleteJson.status=='success'){
        document.getElementById('post-'+habit_id).remove();
    }
    else alert('error deleting habit!');
}