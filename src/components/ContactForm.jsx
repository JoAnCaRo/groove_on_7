/* import React, { useState } from 'react';
import { TextField, Button, FormControl, FormLabel, Checkbox, FormGroup, FormControlLabel, Box } from '@mui/material';
import emailjs from '@emailjs/browser';

// Componente reutilizable para TextField con estilos personalizados
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      musicStyle: checked ? [...prevState.musicStyle, name] : prevState.musicStyle.filter((style) => style !== name),
    }));
  };

const handleSubmit = (e) => {
  e.preventDefault();

  // Configura los datos para EmailJS
  emailjs
    .send(
      'service_d7giud3', // Service ID
      'template_xp5hfvk', // Template ID
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
      'HF-xxiAVFtmRZ0Snv' // Tu Public Key de EmailJS
    )
    .then(
      (result) => {
        console.log('Email enviado:', result.text);
        alert('Email enviado exitosamente.');
      },
      (error) => {
        console.error('Error al enviar el email:', error);
        alert('Hubo un problema al enviar el email. Inténtalo de nuevo.');
      }
    );
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
      <StyledTextField label="Event Location" name="eventLocation" value={formData.eventLocation} onChange={handleInputChange} required />
      <StyledTextField label="City" name="city" value={formData.city} onChange={handleInputChange} required />
      <StyledTextField
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleInputChange}
        InputLabelProps={{ shrink: true }} // Esto asegura que el label no interfiera con el valor predeterminado
        required
      />
      <StyledTextField label="Contact Person" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} required />
      <StyledTextField label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
      <StyledTextField label="Cell" name="cell" type="tel" value={formData.cell} onChange={handleInputChange} />
      <FormControl component="fieldset">
        <FormLabel
          component="legend"
          sx={{
            color: 'var(--secondary-color)', // Color inicial
            '&.Mui-focused': {
              color: 'var(--secondary-color)', // Mantiene el color al interactuar
            },
          }}
        >
          Music Style
        </FormLabel>

        <FormGroup
          row
          sx={{
            display: 'flex',
            justifyContent: 'space-between', // Distribuye proporcionalmente
            gap: 0, // Elimina espacios innecesarios
          }}
        >
          {['Disco', 'Funk', 'House', 'Just Play!'].map((style) => (
            <FormControlLabel
              key={style}
              control={<Checkbox name={style} onChange={handleCheckboxChange} />}
              label={style}
              sx={{
                flex: 1, // Hace que cada checkbox ocupe el mismo espacio
                textAlign: 'center', // Centra el texto del label
              }}
            />
          ))}
        </FormGroup>
      </FormControl>
      <StyledTextField
        label="Additional Information"
        name="additionalInfo"
        multiline
        rows={4}
        value={formData.additionalInfo}
        onChange={handleInputChange}
        placeholder="Write any additional details here..."
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--primary-color)',
          '&:hover': { backgroundColor: 'var(--primary-color)', color: 'var(--secondary-color)' },
        }}
      >
        Submit
      </Button>
      <Button
        onClick={onClose}
        variant="outlined"
        sx={{
          color: 'var(--secondary-color)',
          borderColor: 'var(--secondary-color)',
          '&:hover': { backgroundColor: 'var(--primary-color)', color: 'var(--secondary-color)' },
        }}
      >
        Close
      </Button>
    </Box>
  );
};

export default ContactForm;
 */




import React, { useState } from 'react';
import { TextField, Button, FormControl, FormLabel, Checkbox, FormGroup, FormControlLabel, Box } from '@mui/material';
import emailjs from '@emailjs/browser';

// Componente reutilizable para TextField con estilos personalizados
const StyledTextField = ({ label, required = false, name, type = 'text', multiline = false, rows = 1, formErrors, ...props }) => (
  <FormControl fullWidth>
    <TextField
      required={required}
      name={name}
      variant="outlined"
      label={label}
      type={type}
      multiline={multiline}
      rows={rows}
      error={!!formErrors[name]} // Cambia el estilo si hay un error
      helperText={formErrors[name] ? 'Este campo es obligatorio' : ''} // Texto de ayuda si hay error
      sx={{
        '& .MuiInputLabel-root': {
          color: 'rgba(0, 0, 0, 0.6)',
          '&.Mui-focused': {
            color: 'var(--secondary-color)',
          },
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: formErrors[name] ? 'red' : 'rgba(0, 0, 0, 0.23)', // Cambiar el borde si hay error
          },
          '&:hover fieldset': {
            borderColor: formErrors[name] ? 'red' : 'rgba(0, 0, 0, 0.87)',
          },
          '&.Mui-focused fieldset': {
            borderColor: formErrors[name] ? 'red' : 'var(--secondary-color)',
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      musicStyle: checked ? [...prevState.musicStyle, name] : prevState.musicStyle.filter((style) => style !== name),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si los campos requeridos están completos
    const requiredFields = ['eventLocation', 'city', 'date', 'contactPerson', 'email'];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      alert('Por favor, rellena todos los campos obligatorios.');
      // Añadir errores a los campos vacíos
      setFormErrors(emptyFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}));
      return;
    }

    // Enviar el formulario con EmailJS
    emailjs
      .send(
        'service_d7giud3', // Service ID
        'template_xp5hfvk', // Template ID
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
        'HF-xxiAVFtmRZ0Snv' // Tu Public Key de EmailJS
      )
      .then(
        (result) => {
          console.log('Email enviado:', result.text);
          alert('Email enviado exitosamente.');
          setFormData({
            eventLocation: '',
            city: '',
            date: '',
            contactPerson: '',
            email: '',
            cell: '',
            musicStyle: [],
            additionalInfo: '',
          }); // Restablecer formulario
          setFormErrors({}); // Limpiar errores
        },
        (error) => {
          console.error('Error al enviar el email:', error);
          alert('Hubo un problema al enviar el email. Inténtalo de nuevo.');
        }
      );
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
      <StyledTextField label="Event Location" name="eventLocation" value={formData.eventLocation} onChange={handleInputChange} required formErrors={formErrors} />
      <StyledTextField label="City" name="city" value={formData.city} onChange={handleInputChange} required formErrors={formErrors} />
      <StyledTextField label="Date" name="date" type="date" value={formData.date} onChange={handleInputChange} InputLabelProps={{ shrink: true }} required formErrors={formErrors} />
      <StyledTextField label="Contact Person" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} required formErrors={formErrors} />
      <StyledTextField label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} required formErrors={formErrors} />
      <StyledTextField label="Cell" name="cell" type="tel" value={formData.cell} onChange={handleInputChange} />
      <FormControl component="fieldset">
        <FormLabel component="legend" sx={{ color: 'var(--secondary-color)' }}>
          Music Style
        </FormLabel>
        <FormGroup row sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {['Disco', 'Funk', 'House', 'Just Play!'].map((style) => (
            <FormControlLabel key={style} control={<Checkbox name={style} onChange={handleCheckboxChange} />} label={style} sx={{ flex: 1, textAlign: 'center' }} />
          ))}
        </FormGroup>
      </FormControl>
      <StyledTextField
        label="Additional Information"
        name="additionalInfo"
        multiline
        rows={4}
        value={formData.additionalInfo}
        onChange={handleInputChange}
        placeholder="Write any additional details here..."
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--primary-color)',
          '&:hover': { backgroundColor: 'var(--primary-color)', color: 'var(--secondary-color)' },
        }}
      >
        Submit
      </Button>
      <Button
        onClick={onClose}
        variant="outlined"
        sx={{
          color: 'var(--secondary-color)',
          borderColor: 'var(--secondary-color)',
          '&:hover': { backgroundColor: 'var(--primary-color)', color: 'var(--secondary-color)' },
        }}
      >
        Close
      </Button>
    </Box>
  );
};

export default ContactForm;
