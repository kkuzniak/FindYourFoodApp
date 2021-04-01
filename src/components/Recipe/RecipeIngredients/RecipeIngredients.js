import React from 'react';
import classes from './RecipeIngredients.module.scss';
import RecipeIngredient from './RecipeIgredient/RecipeIngredient';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const RecipeIngredients = ({ingredients}) => {
    return (
        <DragDropContext>
            <Droppable droppableId="RecipeIngredients" style={{overflowY: 'scroll'}}>
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
                                        measure={`${Number.parseFloat(ing.measure.amount).toFixed(0)} ${ing.measure.unit}`}
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

export default RecipeIngredients;