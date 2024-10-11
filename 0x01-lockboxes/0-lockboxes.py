#!/usr/bin/python3
"""
0x01. Lockboxes
"""


def canUnlockAll(boxes):
    """
    Determines if all the boxes in the given list can be unlocked.

    Parameters:
    - boxes (list): A list of lists representing the boxes and their keys.

    Returns:
    - bool: True if all the boxes can be unlocked, False otherwise.
    """
    if not boxes:
        return False

    num_boxes = len(boxes)
    visited = set()
    visited.add(0)  # The first box is unlocked

    box_stack = [0]  # Start with the first box
    while box_stack:
        current_box = box_stack.pop()

        for key in boxes[current_box]:
            if key < num_boxes and key not in visited:
                visited.add(key)
                box_stack.append(key)

    return len(visited) == num_boxes
