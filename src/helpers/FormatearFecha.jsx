export const formatearFecha = (fecha) => {
    const fechaFormateada = new Date(fecha.split('T')[0].split('-'));
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' };
    return fechaFormateada.toLocaleDateString('es-ES', options);
  };