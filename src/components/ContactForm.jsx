/* import React from 'react';
import { TextField, Button, FormControl, FormLabel, Checkbox, FormGroup, FormControlLabel, Box } from '@mui/material';

// Componente reutilizable para TextField con estilos personalizados
const StyledTextField = ({ label, required = false, type = 'text', multiline = false, rows = 1, ...props }) => (
  <FormControl fullWidth>
    <TextField
      required={required}
      variant="outlined"
      label={type !== 'date' ? label : undefined} // Usa el label solo si no es tipo date
      placeholder={type === 'date' ? label : undefined} // Usa el placeholder para tipo date
      type={type}
      multiline={multiline}
      rows={rows}
      sx={{
        fontFamily: 'var(--font-stack)', // Aplica la fuente global
        '& .MuiInputLabel-root': {
          fontFamily: 'var(--font-stack)', // Fuente para el label
          color: 'rgba(0, 0, 0, 0.6)', // Color inicial (por defecto)
          '&.Mui-focused': {
            color: 'var(--secondary-color)', // Cambia el color al hacer focus
          },
        },
        '& .MuiOutlinedInput-root': {
          fontFamily: 'var(--font-stack)', // Fuente para el input
          '& fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.23)', // Borde inicial
          },
          '&:hover fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.87)', // Borde al hacer hover
          },
          '&.Mui-focused fieldset': {
            borderColor: 'var(--secondary-color)', // Borde al hacer focus o introducir texto
          },
        },
        '& input::placeholder': {
          fontFamily: 'var(--font-stack)', // Fuente para el placeholder
          color: type === 'date' ? 'rgba(0, 0, 0, 0.6)' : 'inherit', // Color inicial del placeholder para date
          opacity: 1, // Asegura que sea visible
        },
        '& input': {
          fontFamily: 'var(--font-stack)', // Fuente para el texto introducido
          color: 'var(--secondary-color)', // Color del texto introducido
        },
      }}
      InputLabelProps={type === 'date' ? { shrink: true } : undefined} // Forza el label en campos tipo date
      {...props}
    />
  </FormControl>
);

const ContactForm = ({ onClose }) => {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 3,
        backgroundColor: 'var(--primary-color)',
        color: 'var(--secondary-color)',
        fontFamily: 'var(--font-stack)', // Fuente global para el formulario
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '96%',
        textAlign: 'center',
      }}
    >
      <StyledTextField label="Event Location" required />
      <StyledTextField label="City" required />
      <StyledTextField label="Date" required type="date" InputLabelProps={{ shrink: true }} />
      <StyledTextField label="Contact Person" required />
      <StyledTextField label="Email" required type="email" />
      <StyledTextField label="Cell" type="tel" />

      <FormControl component="fieldset">
        <FormLabel
          component="legend"
          sx={{
            fontFamily: 'var(--font-stack)', // Fuente para el FormLabel
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
            flexDirection: 'row',
            gap: 2,
            justifyContent: 'center',
            fontFamily: 'var(--font-stack)', // Fuente para los checkboxes
          }}
        >
          <FormControlLabel
            control={<Checkbox />}
            label="Disco"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontFamily: 'var(--font-stack)', // Fuente para el texto del checkbox
                color: 'var(--secondary-color)', // Mantén el color inicial
              },
            }}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Funk"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontFamily: 'var(--font-stack)', // Fuente para el texto del checkbox
                color: 'var(--secondary-color)', // Mantén el color inicial
              },
            }}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="House"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontFamily: 'var(--font-stack)', // Fuente para el texto del checkbox
                color: 'var(--secondary-color)', // Mantén el color inicial
              },
            }}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Other"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontFamily: 'var(--font-stack)', // Fuente para el texto del checkbox
                color: 'var(--secondary-color)', // Mantén el color inicial
              },
            }}
          />
        </FormGroup>
      </FormControl>

      <StyledTextField label="Additional Information" multiline rows={4} placeholder="Write any additional details here..." inputProps={{ maxLength: 250 }} />
      <Button
        type="submit"
        variant="contained"
        sx={{
          fontFamily: 'var(--font-stack)', // Fuente para el botón
          backgroundColor: 'var(--secondary-color)',
          color: 'var(--primary-color)',
          '&:hover': { backgroundColor: 'var(--primary-color)', color: 'var(--secondary-color)' },
        }}
        fullWidth
      >
        Submit
      </Button>
      <Button
        onClick={onClose}
        variant="outlined"
        sx={{
          fontFamily: 'var(--font-stack)', // Fuente para el botón
          color: 'var(--secondary-color)',
          borderColor: 'var(--secondary-color)',
          '&:hover': { backgroundColor: 'var(--primary-color)', color: 'var(--secondary-color)' },
          padding: '0.5rem 0rem',
          borderRadius: '5px',
          width: '66px',
          height: '31px',
          textAlign: 'center',
          alignSelf: 'center',
          textTransform: 'none', // Evita las mayúsculas automáticas
        }}
      >
        Close
      </Button>
    </Box>
  );
};

export default ContactForm; */

import React, { useState } from 'react';
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
emailjs.send(
  'service_d7giud3', // El nuevo Service ID para iCloud
  'template_xp5hfvk', // Tu Template ID
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
