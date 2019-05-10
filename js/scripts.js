$(function () {

    let tblBody = $("#tblbody");
    let base_url = 'http://localhost:3000/';
    let imageFile = '';

    function rowTemplate(hero) {
        let source = base_url + "uploads/" + hero.image;
        let oneRow = "<tr><td>" + hero.name + "</td><td>" + hero.desc + "</td>";
        oneRow += "<td><img src= " + source + " width='60' /></td>";
        oneRow += '<td><button type="button" class="btn btn-danger delete" hero_id=' + hero._id + '>Del</button></td> </tr>';
        return oneRow;
    }

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/heroes',
        success: function (heroes) {
            let myRows = [];
            $.each(heroes, function (index, hero) {
                myRows.push(rowTemplate(hero));
            });
            tblBody.append(myRows);
        },
        error: function () {
            alert('Something went wrong!');
        }
    });

    $("#fileToUpload").on('change', function () {
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
                imageFile = data.filename;
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    $("#add-hero").on('click', function () {
        let hero = {
            name: $("#name").val(),
            desc: $("#desc").val(),
            image: imageFile
        };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/heroes',
            data: hero,
            success: function (hero) {
                tblBody.append(rowTemplate(hero));
                $('#hero-form').trigger('reset');
            },
            error: function (error) {
                alert(error);
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
    });

    tblBody.delegate('.delete', 'click', function () {
        $.ajax({
            type: 'DELETE',
            url: base_url + 'heroes/' + $(this).attr('hero_id'),
            success: function () {
                location.reload();
            }
        })
    });
});