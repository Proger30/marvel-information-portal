import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', rowGap: 10, lineHeight: 1.4, fontSize:100, fontWeight: 700, color: '#9F0013'}}>
            404<br />
            Page not found
            <Link to="/" style={{textDecoration: 'underline', color: '#5f1d1d'}}>Go to main</Link>
        </div>
    );
};

export default Page404;