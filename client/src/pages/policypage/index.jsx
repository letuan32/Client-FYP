import React from 'react';
import {Container, Typography, FormGroup, FormControlLabel, Checkbox, Box} from '@mui/material';
import Navbar from "../../components/navbar";

const TermsAndConditionsPage = () => {
    return (
        <>
<Navbar></Navbar>

        <Box
            width="100%"
            padding="2rem 6%"
            gap="0.5rem"
            justifyContent="space-between">
            <Typography variant="h4" align="center" gutterBottom>
                Terms and Conditions
            </Typography>
            <Typography variant="body1" paragraph>
                Welcome to our charity social network, where you can connect with people from around the world to share your charity activities, fundraise, and request support for those in need. By accessing or using our platform, you agree to be bound by these terms and conditions.
            </Typography>
            <Typography variant="h6" gutterBottom>
                User Accounts
            </Typography>
            <Typography variant="body1" paragraph>
                To use our platform, you must create an account and provide accurate and complete information about yourself or your organization. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </Typography>
            <Typography variant="h6" gutterBottom>
                User Content
            </Typography>
            <Typography variant="body1" paragraph>
                You are solely responsible for any content that you post or upload to our platform, including text, images, videos, and other media. You must ensure that your content is accurate, truthful, and does not violate the rights of others. We reserve the right to remove or disable any content that we believe violates these terms and conditions or applicable laws.
            </Typography>
            <Typography variant="h6" gutterBottom>
                Fundraising and Donations
            </Typography>
            <Typography variant="body1" paragraph>
                If you use our platform to fundraise or donate to a cause, you must ensure that your activities comply with applicable laws and regulations. We do not endorse or guarantee the accuracy, completeness, or reliability of any fundraising or donation activities on our platform. We are not responsible for any loss or damage that may result from your participation in these activities.
            </Typography>
            <Typography variant="h6" gutterBottom>
                Privacy and Data Protection
            </Typography>
            <Typography variant="body1" paragraph>
                We respect your privacy and are committed to protecting your personal data. Please refer to our privacy policy for more information about how we collect, use, and disclose your personal data.
            </Typography>
            <Typography variant="h6" gutterBottom>
                Intellectual Property
            </Typography>
            <Typography variant="body1" paragraph>
                Our platform and its contents are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, modify, distribute, or display any part of our platform without our prior written consent.
            </Typography>
            <Typography variant="h6" gutterBottom>
                Disclaimer of Warranties
            </Typography>
            <Typography variant="body1" paragraph>
                Our platform is provided "as is" and without warranties of any kind, either express or implied. We do not guarantee that our platform will be error-free, uninterrupted, or secure. We are not responsible for any damage or loss that may result from your use of our platform.
            </Typography>
            <Typography variant="h6" gutterBottom>
                Limitation of Liability
            </Typography>
            <Typography variant="body1" paragraph>
                In no event shall we be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of our platform or these terms and conditions.
            </Typography>
            <Typography variant="h6" gutterBottom>
                Termination
            </Typography>
            <Typography variant="body1" paragraph>
                We reserve the right to terminate or suspend your account at any time, with or without cause, and without prior notice.
            </Typography>

            <Typography variant="h6" gutterBottom>
                Governing Law and Jurisdiction
            </Typography>
            <Typography variant="body1" paragraph>
                These terms and conditions shall be governed by and construed in accordance with the laws of [insert country or state]. Any disputes arising out of or in connection with these terms and conditions shall be subject to the exclusive jurisdiction of the courts of Vietnam.
            </Typography>
        </Box>
            </>
    )};

export default TermsAndConditionsPage;