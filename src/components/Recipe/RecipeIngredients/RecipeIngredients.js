import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import classes from './RecipeIngredients.module.scss';
import RecipeIngredient from './RecipeIgredient/RecipeIngredient';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import * as actions from '../../../modules/actions/index';
import PropTypes from 'prop-types';

const RecipeIngredients = ({ingredients}) => {
    const dispatch = useDispatch();
    const onDropIngredient = useCallback((sourceIndex, destinationIndex) => dispatch(actions.dropIngredient(sourceIndex, destinationIndex)), [dispatch]);
    
    const dragEndedHandler = useCallback((result) => {
        if (!result.destination) return;
        onDropIngredient(result.source.index, result.destination.index);
    }, [onDropIngredient])

    return (
        <DragDropContext onDragEnd={dragEndedHandler}>
            <Droppable droppableId="RecipeIngredients">
            {(provided) => (
                <ul className={classes.RecipeIngredients} {...provided.droppableProps} ref={provided.innerRef}>
                    {ingredients.map((ing, index) => (
                        <Draggable key={ing.id} draggableId={ing.id} index={index}>
                            {(provided) => (
                                <li ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <RecipeIngredient
                                        id={ing.id} 
                                        name={ing.name} 
                                        measure={`${Number.parseFloat(ing.measure.amount).toFixed(1)} ${ing.measure.unit}`}
                                    />
                                </li>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </ul>
            )}
            </Droppable>
        </DragDropContext>
    );
}

RecipeIngredients.propTypes = {
    ingredients: PropTypes.array
};

export default React.memo(RecipeIngredients);