$(function () {

    let tblBody = $("#tblbody");
    let base_url = 'http://localhost:3000/';
    let imageFile = '';

    function rowTemplate(villain) {
        let oneRow = "<tr><td>" + villain.name + "</td><td>" + villain.desc + "</td>";
        if (villain.image !== '') {
            oneRow += "<td><img src= " + base_url + "uploads/" + villain.image + " width='60' /></td>";
        } else {
            oneRow += "<td> No Image </td>";
        }
        oneRow += '<td><button type="button" class="btn btn-danger delete" villain_id=' + villain._id + '>Del</button></td> </tr>';
        return oneRow;
    }

    $.ajax({
        type: 'GET',
        url: base_url + 'villains',
        success: function (villains) {
            let myRows = [];
            $.each(villains, function (index, villain) {
                myRows.push(rowTemplate(villain));
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
        // $("#add-villain").prop("disabled", true);
        $.ajax({
            type: 'POST',
            url: base_url + 'upload',
            contentType: false,
            cache: false,
            processData: false,
            data: formData,
            success: function (data) {
                imageFile = data.filename;
                // $("#add-villain").prop("disabled", false);
            },
            error: function () {
                alert("Image upload failed!");
            }
        });
    });

    $("#add-villain").on('click', function () {
        let villain = {
            name: $("#name").val(),
            desc: $("#desc").val(),
            image: imageFile
        };
        $.ajax({
            type: 'POST',
            url: base_url + 'villains',
            data: villain,
            success: function (villain) {
                tblBody.append(rowTemplate(villain));
                imageFile = '';
                $('#villain-form').trigger('reset');
            },
            error: function () {
                alert("Fill all the form fields!");
            }
        });
    });

    $("#remove-villains").on('click', function () {
        if (confirm("Do you want to delete all villains?")) {
            $.ajax({
                type: 'DELETE',
                url: base_url + 'villains',
                success: function () {
                    location.reload();
                },
                error: function () {
                    alert("Couldn't delete all villains");
                }
            });
        }
    });

    tblBody.on('click', '.delete', function () {
        $.ajax({
            type: 'DELETE',
            url: base_url + 'villains/' + $(this).attr('villain_id'),
            success: function () {
                location.reload();
            }
        })
    });
});