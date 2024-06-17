import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import styles from './Validator.module.css';
import { checkUrlType, checkUrlValidity } from '../../utils/validateUtils';

const Validadator = () => {
    const [url, setUrl] = useState('');
    const [isValidUrl, setIsValidUrl] = useState(false);
    const [urlStatus, setUrlStatus] = useState<string | null>(null);

    const checkUrlExistence = async (url: string) => {
        try {
          // Mock server response
            const response = await new Promise<{ exists: boolean, type: string }>((resolve) => {
                setTimeout(() => {
                    const urlType = checkUrlType(url);
                resolve({ exists: true, type: urlType }); // Mock a successful response
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
      };

    const debouncedCheckUrlExistence = debounce(checkUrlExistence, 500);

    useEffect(() => {
        if (isValidUrl) {
            debouncedCheckUrlExistence(url);
        }
        }, [url, isValidUrl]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputUrl = e.target.value;
        setUrl(inputUrl);
        setIsValidUrl(checkUrlValidity(inputUrl));
        if (!checkUrlValidity(inputUrl)) {
            setUrlStatus(null);
        }
    };

  return (
    <div className={styles.container}>
      <h1>URL Checker</h1>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={handleInputChange}
      />
      {isValidUrl ? (
        <p>Checking URL...</p>
      ) : (
        <p>Enter a valid URL</p>
      )}
      {urlStatus && <p>{urlStatus}</p>}
    </div>
  )
}

export default Validadator;
