import Swal from 'sweetalert2';

export const showTokenExpirationModal = (timeLeft, handleContinueSession, handleLogout) => {
    let timerInterval;

    Swal.fire({
        title: '¿Sigues ahí?',
        html: `La sesión expirará en <b>${timeLeft}</b> segundos.`,
        timer: timeLeft * 1000,
        timerProgressBar: true,
        showCancelButton: true,
        confirmButtonText: 'Continuar',
        cancelButtonText: `Salir (${timeLeft})`,
        allowOutsideClick: false,
        willOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {
                timeLeft -= 1;
                Swal.getCancelButton().textContent = `Salir (${timeLeft})`;
            }, 1000);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        if (result.isConfirmed) {
            handleContinueSession();
        } else if (result.dismiss === Swal.DismissReason.timer || result.isDismissed) {
            handleLogout();
        }
    });
};
