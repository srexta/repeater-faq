import { __ } from '@wordpress/i18n';
import { useBlockProps,InspectorControls } from '@wordpress/block-editor';
import { PanelBody,Button,RangeControl,TextControl } from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {

	const { repetitions, texts } = attributes;

	const onAddRepetition = () => {
		if (repetitions < 100) {
			setAttributes({
				repetitions: repetitions + 1,
				texts: [...texts, { label: '', value: '' }], 
			});
		}
	};

	const onChangeText = (newValue, index, key) => {
		const newValues = [...texts];
		newValues[index][key] = newValue;
		setAttributes({ texts: newValues });
	};

	const onRemoveRepetition = (index) => {
		const newValues = [...texts];
		newValues.splice(index, 1);
		setAttributes({
			repetitions: repetitions - 1,
			texts: newValues,
		});
	};

	return (
		<div { ...useBlockProps() }>
		<InspectorControls>
			<PanelBody title={__('Repeater Settings')}>
				{texts.map((text, index) => (
					<div className="wrapper-info" key={index}>
						<RangeControl
							label={`Repeater ${index + 1} Value`}
							value={text.value || ''}
							max={100}
							min={1}
							step = {1}
							onChange={(newValue) => onChangeText(newValue, index, 'value')}
						/>
						<TextControl
							label={`Repeater ${index + 1} Label`}
							value={text.label || ''}
							onChange={(newValue) => onChangeText(newValue, index, 'label')}
						/>
						<Button className="remove-btn" isLink onClick={() => onRemoveRepetition(index)}>
							{__('Remove')}
						</Button>
					</div>
				))}
				<Button isPrimary onClick={onAddRepetition}>
					{__('Add')}
				</Button>
			</PanelBody>
			
		</InspectorControls>
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
