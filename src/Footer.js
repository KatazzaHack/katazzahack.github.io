import React from 'react';
import Share from './Share';

class Footer extends React.Component {

	render() {
		return (
			<footer id="statfooter" class="page-footer font-small purple pt-4">
			<Share
      			title={"Вирусная игра"}
      			url={`http://katazzahack.github.io/`}
    		/>
        <div id="public-notice" class="container"><a href="https://www.freepik.com/free-photos-vectors/design">Design vector created by freepik - www.freepik.com</a></div>

			</footer>
		);
	}
}

export default Footer;
