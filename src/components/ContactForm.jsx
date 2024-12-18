/* Importa React, hooks y material del formulario */
import React, { useState } from 'react';
import { TextField, Button, FormControl, FormLabel, Checkbox, FormGroup, FormControlLabel, Box, CircularProgress } from '@mui/material';
import emailjs from '@emailjs/browser';

// Componente  para TextField con estilos personalizados
const StyledTextField = ({ label, required = false, type = 'text', multiline = false, rows = 1, ...props }) => (
  <FormControl fullWidth>
    <TextField
      required={required}
      variant="outlined"
      label={label}
      type={type}
      multiline={multiline}
      rows={rows}
      sx={{
        '& .MuiInputLabel-root': {
          color: 'rgba(0, 0, 0, 0.6)',
          '&.Mui-focused': {
            color: 'var(--secondary-color)',
          },
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.23)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.87)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'var(--secondary-color)',
          },
        },
        '& input::placeholder': {
          color: 'rgba(0, 0, 0, 0.6)',
          opacity: 1,
        },
      }}
      {...props}
    />
  </FormControl>
);

/* Componente principal ContactForm */
const ContactForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    eventLocation: '',
    city: '',
    date: '',
    contactPerson: '',
    email: '',
    cell: '',
    musicStyle: [],
    additionalInfo: '',
  });

  const [formErrors, setFormErrors] = useState({}); // Estado para rastrear errores en los campos
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar el indicador de carga

  // Maneja los cambios en los campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors((prev) => ({ ...prev, [name]: false })); // Limpiar error al escribir
  };

  // Maneja los cambios en los checkboxes de estilos de música
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      musicStyle: checked ? [...prevState.musicStyle, name] : prevState.musicStyle.filter((style) => style !== name),
    }));
  };

  // Envía el formulario usando EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lista de campos obligatorios
    const requiredFields = ['eventLocation', 'city', 'date', 'contactPerson', 'email'];

    // Verificar si hay campos vacíos y actualizar el estado de errores
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = true;
      }
    });

    setFormErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert('Por favor, rellena todos los campos obligatorios.');
      return;
    }

    setIsLoading(true); // Mostrar el indicador de carga

    try {
      const result = await emailjs.send(
        'service_d7giud3', // Service ID EmailJS
        'template_xp5hfvk', // Template ID EmailJS
        {
          eventLocation: formData.eventLocation,
          city: formData.city,
          date: formData.date,
          contactPerson: formData.contactPerson,
          email: formData.email,
          cell: formData.cell,
          musicStyle: formData.musicStyle.join(', '),
          additionalInfo: formData.additionalInfo,
        },
        'HF-xxiAVFtmRZ0Snv' // Clave pública de EmailJS
      );
      console.log('Email enviado:', result.text);
      alert('Email enviado exitosamente.');
    } catch (error) {
      console.error('Error al enviar el email:', error);
      alert('Hubo un problema al enviar el email. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false); // Ocultar el indicador de carga
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 3,
        backgroundColor: 'var(--primary-color)',
        color: 'var(--secondary-color)',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '96%',
        textAlign: 'center',
      }}
    >
      {/* Campos de texto con validación */}
      <StyledTextField
        label="Event Location"
        name="eventLocation"
        value={formData.eventLocation}
        onChange={handleInputChange}
        required
        error={!!formErrors.eventLocation} // Cambia el color si hay error
      />
      <StyledTextField
        label="City"
        name="city"
        value={formData.city}
        onChange={handleInputChange}
        required
        error={!!formErrors.city} // Cambia el color si hay error
      />
      <StyledTextField
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleInputChange}
        InputLabelProps={{ shrink: true }}
        required
        error={!!formErrors.date} // Cambia el color si hay error
      />
      <StyledTextField
        label="Contact Person"
        name="contactPerson"
        value={formData.contactPerson}
        onChange={handleInputChange}
        required
        error={!!formErrors.contactPerson} // Cambia el color si hay error
      />
      <StyledTextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        required
        error={!!formErrors.email} // Cambia el color si hay error
      />
      <StyledTextField label="Cell" name="cell" type="tel" value={formData.cell} onChange={handleInputChange} />

      {/* Selección de estilos de música con checkboxes */}
      <FormControl component="fieldset">
        <FormLabel
          component="legend"
          sx={{
            color: 'var(--secondary-color)',
            '&.Mui-focused': {
              color: 'var(--secondary-color)',
            },
          }}
        >
          Music Style
        </FormLabel>
        <FormGroup
          row
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 0,
          }}
        >
          {['Disco', 'Funk', 'House', 'Just Play!'].map((style) => (
            <FormControlLabel
              key={style}
              control={<Checkbox name={style} onChange={handleCheckboxChange} />}
              label={style}
              sx={{
                flex: 1,
                textAlign: 'center',
              }}
            />
          ))}
        </FormGroup>
      </FormControl>

      {/* Campo de información adicional */}
      <StyledTextField
        label="Additional Information"
        name="additionalInfo"
        multiline
        rows={4}
        value={formData.additionalInfo}
        onChange={handleInputChange}
        placeholder="Write any additional details here..."
      />

      {/* Botón de enviar con indicador de carga */}
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--primary-color)',
          '&:hover': { backgroundColor: 'var(--primary-color)', color: 'var(--secondary-color)' },
        }}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress size={24} sx={{ color: 'var(--primary-color)' }} /> : 'Submit'}
      </Button>

      {/* Botón para cerrar el formulario */}
      <Button
        onClick={onClose}
        variant="outlined"
        sx={{
          color: 'var(--secondary-color)',
          borderColor: 'var(--secondary-color)',
          '&:hover': { backgroundColor: 'var(--primary-color)', color: 'var(--secondary-color)' },
        }}
        disabled={isLoading}
      >
        Close
      </Button>
    </Box>
  );
};

export default ContactForm;
