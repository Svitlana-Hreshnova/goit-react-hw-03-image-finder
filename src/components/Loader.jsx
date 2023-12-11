import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loader = () => (
  <div className="Loader">
    <ClipLoader color="#00BFFF" loading size={100} css={override} />
  </div>
);

export default Loader;
