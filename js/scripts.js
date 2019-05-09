$(function () {
    let tblBody = $("#tblbody");
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/heroes',
        success: function (heroes) {
            let myRows = [];

            $.each(heroes, function (index, hero) {
                source = 'http://localhost:3000/uploads/' + hero.image;
                thisRow = "<tr><td>" + hero.name + "</td><td>" + hero.desc + "</td>";
                thisRow += "<td><img src= " + source + " width='60' /></td></tr>";
                myRows.push(thisRow);
            });
            tblBody.append(myRows);
        },
        error: function () {
            alert('Something went wrong!');
        }
    });


    $("#add-hero").on('click', function () {
        let formData = new FormData();
        let files = $("#fileToUpload").get(0).files;
        if (files.length > 0) {
            formData.append("imageFile", files[0]);
        }

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/upload',
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (data) {
                let hero = {
                    name: $("#name").val(),
                    desc: $("#desc").val(),
                    image: data.filename
                };
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:3000/heroes',
                    data: hero,
                    success: function (hero) {
                        source = 'http://localhost:3000/uploads/' + hero.image;
                        thisRow = "<tr><td>" + hero.name + "</td><td>" + hero.desc + "</td>";
                        thisRow += "<td><img src= " + source + " width='60' /></td></tr>";

                        tblBody.append(thisRow);
                        $('#hero-form').trigger('reset');
                    },
                    error: function (error) {
                        alert(error);
                    }
                });
            },
            error: function (error) {
                console.log(error);
            }
        })


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
    });
});