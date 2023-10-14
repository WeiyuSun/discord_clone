import React from 'react';

type Props = {
	params: {
		serverId: string
	}
}

function ServerIdPage({params}: Props): React.JSX.Element {

	return (
		<div>{`This is server: ${params.serverId} page`}</div>
	);
}

export default ServerIdPage;