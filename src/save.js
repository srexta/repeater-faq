/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const blockProps = useBlockProps.save();
	const { texts } = attributes; 
	return (
		<div { ...blockProps }>
			{texts.map((text, index) => (
				<div key={index}>
					<div className="progress">
					<span className='Label'>{ text.label }</span>
					<div className="progress-bar" role="progressbar" style={{ width: `${parseFloat(text.value) || 0}%`,marginBottom:"20px" }} aria-valuenow={parseFloat(text.value) || 0}>
					</div>
				</div>
			</div>
			))}
		</div>
	);
}
