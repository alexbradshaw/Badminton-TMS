import { useState } from 'react';
import './TestPage.css'

const TestPage = () => {
    const [test, setTest] = useState("test name");

    return (
        <>
            <div>
                Hello: {test}
            </div>
        </>
    );
}

export default TestPage;