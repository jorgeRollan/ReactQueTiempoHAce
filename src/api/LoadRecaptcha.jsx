import React, { useEffect, useState } from 'react';

const LoadReCaptcha = () => {
    const script = document.createElement('script');
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
};

export default LoadReCaptcha;
