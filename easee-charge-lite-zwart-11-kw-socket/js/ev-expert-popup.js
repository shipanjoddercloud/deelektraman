jQuery(document).ready(function($) {
    var modal = $('#ev-expert-popup-modal');

    // Open de modal en voeg 'modal-open' toe aan de body
    $(document).on('click', '.open-ev-expert-popup', function(e) {
         e.preventDefault();
         modal.addClass('active');
         $('body').addClass('modal-open');
         // Scroll de modal-content (of de modal) naar boven op mobiel
         if ($(window).width() < 768) {
             modal.scrollTop(0);
         }
    });

    // Sluit de modal wanneer op de close knop wordt geklikt
    modal.find('.close').on('click', function() {
         modal.removeClass('active');
         $('body').removeClass('modal-open');
    });

    // Sluit de modal wanneer er buiten de modal-content wordt geklikt
    $(window).on('click', function(event) {
         if ($(event.target).is(modal)) {
              modal.removeClass('active');
              $('body').removeClass('modal-open');
         }
    });

    // Verwerking van het formulier via AJAX
    $('#ev-expert-popup-form').on('submit', function(e) {
         e.preventDefault();
         
         // Voeg spinner-overlay toe aan de modal-content
         var $modalContent = $('#ev-expert-popup-modal .modal-content');
         $modalContent.append('<div class="spinner-overlay"><div class="spinner"></div></div>');
         
         var formData = {
              action: 'ev_expert_popup',
              companyName: $('#companyName').val(),
              name: $('#name').val(),
              email: $('#email').val(),
              phone: $('#phone').val()
         };

         $.post(evExpertPopup.ajaxUrl, formData, function(response) {
              // Verwijder de spinner-overlay ongeacht succes of error
              $('.spinner-overlay').remove();
              
              if (response.success) {
                   var successHtml = '<div class="success-message">';
                   successHtml += '<div class="check-icon">';
                   successHtml += '<svg width="48" height="48" viewBox="0 0 24 24" fill="#48bb78" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.17L4.83 12 3.41 13.41 9 19 21 7 19.59 5.59 9 16.17Z"/></svg>';
                   successHtml += '</div>';
                   successHtml += '<p>Bedankt voor uw aanvraag. Wij nemen spoedig contact met u op.</p>';
                   successHtml += '<button class="close-success">Sluiten</button>';
                   successHtml += '</div>';
                   
                   $('#ev-expert-popup-form').replaceWith(successHtml);
              } else {
                   $('#ev-expert-popup-message').html('<p class="error">' + response.data + '</p>');
              }
         });
    });
    
    // Sluit de modal bij het klikken op de 'Sluiten'-knop in het succesbericht
    $(document).on('click', '.close-success', function() {
         modal.removeClass('active');
         $('body').removeClass('modal-open');
         location.reload();
    });
});
