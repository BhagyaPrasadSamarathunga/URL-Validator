import { useState, useEffect, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';
import styles from './Validator.module.css';
import { checkUrlType, checkUrlValidity } from '../../utils/validateUtils';

const Validadator = () => {
    const [url, setUrl] = useState('');
    const [isValidUrl, setIsValidUrl] = useState(false);
    const [urlStatus, setUrlStatus] = useState<string | null>(null);

    const debouncedCheckUrlExistence = useMemo(
      () =>debounce(async (url: string) => {
        try {
          // Mock server response
            const response = await new Promise<{ exists: boolean, type: string }>((resolve) => {
                setTimeout(() => {
                    const urlType = checkUrlType(url);
                    const exists = Math.random() > 0.5; // Randomly set URL existant
                resolve({ exists, type: urlType });
                }, 1000);
            });
    
            if (response.exists) {
                setUrlStatus(`URL exists and it is a ${response.type}`);
            } else {
                setUrlStatus('URL does not exist');
            }
        } catch (error) {
          setUrlStatus('Error checking URL');
        }
      }, 500),[]);

    useEffect(() => {
      if(url.length === 0) {
        setUrlStatus('Enter a URL to check');
      } else {
        if (isValidUrl) {
          setUrlStatus('Checking URL...');
            debouncedCheckUrlExistence(url);
        }
        else{
          setUrlStatus('Enter a valid URL');
        }
      }
       
        }, [url, isValidUrl]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const inputUrl = e.target.value;
        setUrl(inputUrl);
        setIsValidUrl(checkUrlValidity(inputUrl));
        if (!checkUrlValidity(inputUrl)) {
            setUrlStatus(null);
        }
    },
    [checkUrlValidity]);

  return (
    <div className={styles.container}>
      <h1>URL Checker</h1>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={handleInputChange}
      />
      {urlStatus && <p>{urlStatus}</p>}
    </div>
  )
}

export default Validadator;
