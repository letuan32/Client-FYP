import * as yup from "yup";


export const registerSchema = yup.object().shape({
    username: yup.string()
                .required('Username is required')
                .min(8, 'Username must be at least 8 characters long')
                .matches(
                  /^[a-zA-Z0-9!\(\)\-\.\?\[\]\_\`\~\;\:\!\@\#\$\%\^\&\*\+\=]+$/,
                  'Username can only contain letters, numbers, and the following special characters: !()-.[]_`~;:!@#$%^&*+='
                ),
    email: yup.string().email("invalid email").min(8).required("required"),
    password: yup
              .string()
              .required('Password is required')
              .min(8, 'Password must be at least 8 characters long')
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\(\)\-\.\?\[\]\_\`\~\;\:\!\@\#\$\%\^\&\*\+\=])[a-zA-Z0-9!\(\)\-\.\?\[\]\_\`\~\;\:\!\@\#\$\%\^\&\*\+\=]{8,}$/,
                'Password must contain at least one lowercase letter, one uppercase letter, one number, and one of the following special characters: !()-.[]_`~;:!@#$%^&*+='
              ),
    location: yup.string()
    .required('location is required')
    .matches(/^[a-zA-Z0-9, ]+$/,'Location can only contain letters and numbers'),

    occupation: yup.string()
    .required('occupation is required')
    .matches(/^[a-zA-Z0-9 ]+$/,'Occupation can only contain letters and numbers'),
  });

export const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required('Password is required')
    .min(6, 'Invalid password')
    // .matches(
      // /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\(\)\-\.\?\[\]\_\`\~\;\:\!\@\#\$\%\^\&\*\+\=])[a-zA-Z0-9!\(\)\-\.\?\[\]\_\`\~\;\:\!\@\#\$\%\^\&\*\+\=]{8,}$/,
      // 'Invalid password'
    // ),
});

export const postSchema = yup.object().shape({
    content: yup.string()
        .required('Content is required')
        .trim()
        .min(10, 'Content must be at least 10 character')
        .matches(
            /^[a-zA-Z0-9!\(\)\-\.\?\[\]\_\`\~\;\:\!\@\#\$\%\^\&\*\+\= ',"]+$/,
            'Content can only contain letters, numbers, spaces, and the following special characters: !()-.[]_`~;:!@#$%^&*+='
        ),
    location: yup.string()
        .required('Location is required')
        .trim()
        .max(250, 'Location must be less than 250 characters')
        .min(10, 'Location must be at least 10 character')
        .matches(
            /^[a-zA-Z0-9!\(\)\-\.\?\[\]\_\`\~\;\:\!\@\#\$\%\^\&\*\+\= ',"]+$/,
            'Location can only contain letters, numbers, spaces, and the following special characters: !()-.[]_`~;:!@#$%^&*+='
        ),
    mediaUrls: yup
        .array()
        .of(yup.string()),
    documentUrls: yup
        .array()
        .of(yup.string()),
    expectedAmount: yup.number()
        .nullable()
        .positive('Expected amount must be a positive number'),
    expectedReceivedDate: yup.date()
        .nullable(),
    postCategoryEnum: yup.number()
        .required('Post category is required'),
    currencyEnum: yup.string()
        .nullable()
        .required('Currency is required'),
});