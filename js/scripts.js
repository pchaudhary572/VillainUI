$(function () {
    // $.getJSON("http://localhost:3000/heroes", function (heroes) {
    //     console.log(heroes);
    //     let myRows = [];
    //     $.each(heroes, function (index, hero) {
    //         myRows.push("<tr><td>" + hero.name + "</td><td>" + hero.desc + "</td></tr>");
    //     });
    //     $("#tblbody").append(myRows);
    // });
    let tblBody = $("#tblbody");
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/heroes',
        success: function (heroes) {
            let myRows = [];
            $.each(heroes, function (index, hero) {
                myRows.push("<tr><td>" + hero.name + "</td><td>" + hero.desc + "</td></tr>");
            });
            tblBody.append(myRows);
        },
        error: function () {
            alert('Something went wrong!');
        }
    });

    $("#add-hero").on('click', function () {
        let hero = {
            name: $("#name").val(),
            desc: $("#desc").val()
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/heroes',
            data: hero,
            success: function (newHero) {
                tblBody.append("<tr><td>" + newHero.name + "</td><td>" + newHero.desc + "</td></tr>")
            },
            error: function () {
                alert("Couldn't save hero");
            }
        });
    });

    $("#remove-heroes").on('click', function () {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:3000/heroes',
            success: function () {
                alert("Deleting all heroes!");
                location.reload();
            },
            error: function () {
                alert("Couldn't delete all heroes");
            }
        });
    })
});