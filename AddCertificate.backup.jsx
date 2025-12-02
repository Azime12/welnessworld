import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  Box,
  Typography,
  Paper,
  styled,
  CircularProgress,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormikEthiopianDatePicker from '../../../components/inputFields/DatePickerField';
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import workerSrc from 'pdfjs-dist/build/pdf.worker?url';
import { getDocument } from 'pdfjs-dist';
import { useCreateWorkMutation } from '../../../redux/api/certificateApiSlice';
import { useTranslation } from 'react-i18next';
import { useGetSettingsDataQuery } from '../../../redux/api/dataSettingsApiSlice';
import MyTextField from '../../../components/Input';
import { production } from '../../../constants/apiTags';

GlobalWorkerOptions.workerSrc = workerSrc;
// GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js'

if (production) {
  // Production configuration - use CDN
  GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
} else {
  // Development configuration - use local worker
  GlobalWorkerOptions.workerSrc = workerSrc;
}
// Styled components with teal brand color
const TealButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#008080',
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: '#006666',
  },
  '&:disabled': {
    backgroundColor: '#b2d8d8',
  },
  borderRadius: '8px',
  fontFamily: 'Abyssinica SIL',
  fontWeight: 600,
}));

const OutlinedButton = styled(Button)({
  color: '#008080',
  borderColor: '#008080',
  '&:hover': {
    borderColor: '#006666',
    backgroundColor: 'rgba(0, 128, 128, 0.04)',
  },
  borderRadius: '8px',
  fontFamily: 'Abyssinica SIL',
  fontWeight: 600,
});

const FileUploadArea = styled('div')({
  border: '2px dashed #008080',
  borderRadius: '8px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s',
  '&:hover': {
    backgroundColor: 'rgba(0, 128, 128, 0.05)',
  },
});

const FormGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: theme.spacing(3),
  },
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    fontFamily: 'Abyssinica SIL',
    '&.Mui-focused fieldset': {
      borderColor: '#008080',
    },
  },
  '& .MuiInputLabel-root': {
    fontFamily: 'Abyssinica SIL',
    '&.Mui-focused': {
      color: '#008080',
    },
  },
});



export default function AddCertificateModal({ open, onClose, profileId, onSuccess }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [certificateFile, setCertificateFile] = useState(null);
  const [fileError, setFileError] = useState('');
  
  // State for tracking loading states
  const [isProcessingPdf, setIsProcessingPdf] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  
  //c API data fetching with proper error handling
  const {
    data: courseTypesData,
    isLoading: isLoadingCourseTypes,
    isError: isErrorCourseTypes,
    error: errorCourseTypes,
  } = useGetSettingsDataQuery('courseTypes');
  
  const {
    data: courseProvidersData,
    isLoading: isLoadingCourseProviders,
    isError: isErrorCourseProviders,
    error: errorCourseProviders,
  } = useGetSettingsDataQuery('courseProviders');
  
  const {
    data: subcityCenterOfficeData,
    isLoading: isLoadingSubcityCenter,
    isError: isErrorSubcityCenter,
    error: errorSubcityCenter,
  } = useGetSettingsDataQuery('subcityCenterOffice');
  
  const {
    data: subcitySectorOfficeData,
    isLoading: isLoadingSubcitySector,
    isError: isErrorSubcitySector,
    error: errorSubcitySector,
  } = useGetSettingsDataQuery('subcitySectorOffice');
 const {
    data: subCitiesData,
    isLoading: isLoadingsubCities,
    isError: isErrorSubCities,
    error: errorSubCities,
  } = useGetSettingsDataQuery('subCity');
  
  // Process API data with fallback to empty array if 404 or error
  const courseTypes = Array.isArray(courseTypesData?.data) ? courseTypesData.data : [];
  const courseProviders = Array.isArray(courseProvidersData?.data) ? courseProvidersData.data : [];
  const subcityCenterOffice = Array.isArray(subcityCenterOfficeData?.data) ? subcityCenterOfficeData.data : [];
  const subcitySectorOffice = Array.isArray(subcitySectorOfficeData?.data) ? subcitySectorOfficeData.data : [];
  const subCities = (subCitiesData?.status === 404 || isErrorSubCities) ? [] : subCitiesData?.data || [];

  // Combine sectors for the dropdown
  const allSectors = [
    ...subCities,
    ...subcityCenterOffice
  ].filter((value, index, self) => 
    self.indexOf(value) === index
  );

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  
  const [addCertificate, { isLoading: isAddingCertificate }] = useCreateWorkMutation();

  // Combined loading states
  const isLoadingData = isLoadingCourseTypes || isLoadingCourseProviders || 
                       isLoadingsubCities || isLoadingSubcityCenter;
  const isProcessing = isProcessingPdf || isSubmittingForm || isAddingCertificate;

  const validationSchema = Yup.object().shape({
    organization: Yup.string().required(t('addCertificateModal.organization.error')),
    sector: Yup.string().required(t('addCertificateModal.sector.error')),
    courseType: Yup.string().required(t('addCertificateModal.courseType.error')),
    isComplete: Yup.boolean().required(t('addCertificateModal.status.error')),
    date: Yup.date().required(t('addCertificateModal.date.error')),
    certificateLink: Yup.string().url(t('addCertificateModal.certificateLink.error')),
  });

  const formik = useFormik({
    initialValues: {
      organization: '',
      sector: '',
      courseType: '',
      certificateLink: '',
      isComplete: false,
      date: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (values.isComplete && !certificateFile) {
        setFileError(t('addCertificateModal.fileUpload.errors.required'));
        return;
      }

      try {
        setIsSubmittingForm(true);

        const formattedDate = values.date
          ? new Date(values.date).toISOString().split('T')[0]
          : null;

        const formData = new FormData();
        formData.append('organization', values.organization);
        formData.append('sector', values.sector);
        formData.append('courseType', values.courseType);
        formData.append('certificateLink', values.certificateLink || '');
        formData.append('isComplete', values.isComplete);
        formData.append('date', formattedDate);
        formData.append('profile_id', profileId);

        if (certificateFile) {
          formData.append('certificate', certificateFile);
        }

        await addCertificate(formData).unwrap();

        setSnackbar({
          open: true,
          message: t('addCertificateModal.notifications.success'),
          severity: 'success',
        });

        formik.resetForm();
        setCertificateFile(null);
        if (onSuccess) onSuccess();
        setTimeout(() => onClose(), 1000);
      } catch (error) {
        console.error('Error adding certificate:', error);
        setSnackbar({
          open: true,
          message: error?.data?.message || t('addCertificateModal.notifications.error'),
          severity: 'error',
        });
      } finally {
        setIsSubmittingForm(false);
      }
    },
  });


// Enhanced PDF text extraction function
const extractUdacityCertificateUrl = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    const pdf = await getDocument({
      data: arrayBuffer,
      cMapUrl: production 
        ? 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/cmaps/'
        : 'node_modules/pdfjs-dist/cmaps/',
      cMapPacked: true,
    }).promise;

    // Multiple URL patterns to catch different formats
    const urlPatterns = [
      /https?:\/\/www\.udacity\.com\/certificate\/e\/([a-f0-9-]{36})/i,
      /www\.udacity\.com\/certificate\/e\/([a-f0-9-]{36})/i,
      /udacity\.com\/certificate\/e\/([a-f0-9-]{36})/i
    ];

    // Check first 3 pages at most
    for (let i = 1; i <= Math.min(pdf.numPages, 3); i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const fullText = textContent.items.map(item => item.str).join(' ');

      for (const pattern of urlPatterns) {
        const match = fullText.match(pattern);
        if (match) {
          // Ensure URL has proper format
          return match[0].startsWith('http') 
            ? match[0]
            : `https://www.udacity.com/certificate/e/${match[1]}`;
        }
      }
    }

    return ''; // No URL found
  } catch (error) {
    console.error('PDF processing error:', error);
    return '';
  }
};

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileError('');
    
    if (file.type !== 'application/pdf') {
      setFileError(t('addCertificateModal.fileUpload.errors.invalidType'));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError(t('addCertificateModal.fileUpload.errors.sizeLimit'));
      return;
    }

    const certificateUrl = await extractUdacityCertificateUrl(file);

    if (certificateUrl) {
      formik.setFieldValue('certificateLink', certificateUrl);
      formik.setFieldValue('organization', 'ዩዳሲቲ');
    }

    setCertificateFile(file);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={isProcessing ? undefined : onClose}
        maxWidth="md" 
        fullWidth
        fullScreen={isSmallScreen}
        PaperProps={{
          sx: {
            borderRadius: isSmallScreen ? 0 : '12px',
            overflow: 'hidden',
            margin: isSmallScreen ? 0 : '32px',
            maxHeight: isSmallScreen ? '100vh' : 'calc(100vh - 64px)',
          }
        }}
      >
        <DialogTitle sx={{ 
          backgroundColor: '#008080', 
          color: 'white',
          padding: '16px 24px',
          fontFamily: 'Abyssinica SIL',
          fontWeight: 600,
        }}>
          {t('addCertificateModal.title')}
        </DialogTitle>
        <DialogContent dividers sx={{ 
          padding: isSmallScreen ? '16px' : '24px',
          overflowY: 'auto',
        }}>
          {isLoadingData ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress size={60} sx={{ color: '#008080' }} />
            </Box>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <FormGrid>
                {/* Organization Autocomplete */}
                <MyTextField
                autocomplete
                formik={formik}
                fullWidth
                bRadius={'10px'}
                freeSolo
                name={'organization'}
                selectData={[...courseProviders]}
                                  loading={isLoadingCourseProviders}

                                  label={t('addCertificateModal.organization.label')}
                />
            

                {/* Sector Autocomplete */}
                <MyTextField
                name={'sector'}
                formik={formik}
                bRadius={'10px'}
                label={t('addCertificateModal.sector.label')}
                fullWidth
                freeSolo
                autocomplete
                selectData={allSectors}
                />
                  

                {/* Course Type Autocomplete */}

                <MyTextField
                name={'courseType'}
                freeSolo
                autocomplete
                selectData={courseTypes}
                loading={isLoadingCourseTypes}
                fullWidth
                bRadius={'10px'}
formik={formik}
label={t('addCertificateModal.courseType.label')}
                />

               

                {formik.values.isComplete && (
                  <Box>
                    <Typography
                      sx={{
                        color: "#144e4c",
                        fontFamily: "Abyssinica SIL",
                        fontSize: "16px",
                        fontWeight: 600,
                        lineHeight: "normal",
                        display: "block",
                        height: "auto",
                        marginBottom: 1,
                      }}
                      variant="subtitle1"
                    >
                      {t('addCertificateModal.certificateLink.label')}
                    </Typography>
                    <StyledTextField
                      size="small"
                      name="certificateLink"
                      variant="outlined"
                      fullWidth
                      value={formik.values.certificateLink}
                      onChange={formik.handleChange}
                      error={formik.touched.certificateLink && Boolean(formik.errors.certificateLink)}
                      helperText={formik.touched.certificateLink && formik.errors.certificateLink}
                    />
                  </Box>
                )}

                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formik.values.isComplete}
                        onChange={(e) => formik.setFieldValue('isComplete', e.target.checked)}
                        color="primary"
                        disabled={isProcessing}
                      />
                    }
                    label={
                      <Typography
                        sx={{
                          color: "#144e4c",
                          fontFamily: "Abyssinica SIL",
                          fontSize: "16px",
                          fontWeight: 600,
                        }}
                      >
                        {t('addCertificateModal.status.label')}
                      </Typography>
                    }
                  />
                  {formik.touched.isComplete && formik.errors.isComplete && (
                    <Typography variant="caption" color="error" sx={{ fontFamily: 'Abyssinica SIL' }}>
                      {formik.errors.isComplete}
                    </Typography>
                  )}
                </Box>

                <FormikEthiopianDatePicker
                  name={'date'}
                  formik={formik}
                  required={true}
                  disabled={isProcessing}
                  label={formik.values.isComplete 
                    ? t('addCertificateModal.date.completedLabel') 
                    : t('addCertificateModal.date.startedLabel')}
                />
              </FormGrid>

              {formik.values.isComplete && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    sx={{
                      color: "#144e4c",
                      fontFamily: "Abyssinica SIL",
                      fontSize: "16px",
                      fontWeight: 600,
                      lineHeight: "normal",
                      display: "block",
                      height: "auto",
                      marginBottom: 1,
                    }}
                    variant="subtitle1"
                  >
                    {t('addCertificateModal.fileUpload.label')}
                  </Typography>
                  <FileUploadArea>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      id="certificate-upload"
                      disabled={isProcessing}
                    />
                    <label htmlFor="certificate-upload">
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {isProcessingPdf ? (
                          <CircularProgress size={40} sx={{ color: '#008080', mb: 1 }} />
                        ) : (
                          <CloudUploadIcon sx={{ color: '#008080', fontSize: '40px', mb: 1 }} />
                        )}
                        <Typography variant="body2" sx={{ 
                          color: '#008080', 
                          mb: 1,
                          fontFamily: 'Abyssinica SIL',
                          wordBreak: 'break-word',
                          textAlign: 'center',
                        }}>
                          {certificateFile ? certificateFile.name : t('addCertificateModal.fileUpload.placeholder')}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          color: 'text.secondary',
                          fontFamily: 'Abyssinica SIL',
                          textAlign: 'center',
                        }}>
                          {t('addCertificateModal.fileUpload.instructions')}
                        </Typography>
                      </Box>
                    </label>
                  </FileUploadArea>
                  {fileError && (
                    <Typography variant="caption" color="error" sx={{ fontFamily: 'Abyssinica SIL' }}>
                      {fileError}
                    </Typography>
                  )}
                </Box>
              )}

              <DialogActions sx={{ 
                justifyContent: 'space-between', 
                pt: 1,
                flexDirection: isSmallScreen ? 'column-reverse' : 'row',
                gap: isSmallScreen ? 2 : 0,
              }}>
                <OutlinedButton 
                  onClick={onClose} 
                  variant="outlined"
                  disabled={isProcessing}
                  fullWidth={isSmallScreen}
                >
                  {t('addCertificateModal.buttons.cancel')}
                </OutlinedButton>
                <TealButton 
                  type="submit" 
                  variant="contained"
                  disabled={isProcessing}
                  fullWidth={isSmallScreen}
                >
                  {isProcessing ? (
                    <>
                      <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
                      {t('addCertificateModal.buttons.submitting')}
                    </>
                  ) : (
                    t('addCertificateModal.buttons.submit')
                  )}
                </TealButton>
              </DialogActions>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ fontFamily: 'Abyssinica SIL' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}