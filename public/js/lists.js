$('#upload-list-avatar').change(function () {
    // select the form and submit
    $('#upload-list-avatar-form').submit();
});

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    var $deleteModal = $('#delete-modal');
    $('.list-item-delete').on('click', function (evn) {
        evn.preventDefault();

        $deleteModal.modal('show');
        var resourceId = $(this).data('itemId'),
            $pressedButton = $(this);

        $deleteModal.find('.confirm-btn').on('click', function (e) {
            e.preventDefault();
            var submitUrl = $(this).data('submitUrl'),
                _token = $(this).data('csrf');

            $.ajax({
                url: submitUrl,
                data: {
                    'resourceId': resourceId,
                    '_token': _token
                },
                method: 'post',
                success: function () {
                    $deleteModal.modal('hide');
                    $pressedButton.closest('tr').slideUp();
                }
            });
        });
    });

    $('.list-item-edit').on('click', function (evn) {
        evn.preventDefault();

        var $modal = $('.add-to-list'),
            _token = $(this).data('csrf');

        $.ajax({
            url: '/series/series',
            data: {
                'itemId': $(this).data('itemId'),
                '_token': _token
            },
            method: 'post',
            success: function(response) {
                var $startedAt = $modal.find('input[name="started_at"]'),
                    $finishedAt = $modal.find('input[name="finished_at"]');
                $modal.find('input[name="progress"]').attr('value', response.progress);
                $modal.find('input[name="item_id"]').attr('value', response.id);
                $modal.find('select[name="score"]').val(response.score);
                $modal.find('select[name="reread_value"]').val(response.reread_value);
                $modal.find('select[name="list_id"]').val(response.list_id);
                $startedAt.val(response.started_at);
                $finishedAt.val(response.finished_at);

                $startedAt.datetimepicker({format: 'yyyy/mm'});
                $finishedAt.datetimepicker({format: 'yyyy/mm'});
            }
        });

    });
});