# 337-Honors-Proj
## How to play
Wordtris is a combination of tetris with word matching. You can choose to play like regular tetris with only full row fills, but you could also choose to create 3 letter or longer words for a much larger large score reward. Words are matched in the horizontal direction, the longer/more complicated the word, the greater the point reward.

User registration is required to play and view your own scores.

## Controls
Press any key on your keyboard to select a character.
Up arrow key → Rotate shape
Left/Right/Down arrow keys → Move left/right/down

## Scoring

Scoring is done similar to the way scrabble is scored with a multiplier. Each letter is worth a certain point, and the letter scores are aggregated and scaled (multiplied by 10) to get the total number of points for the word matched.

The point values are as follows:
 'A': 1,
  'B': 3,
  'C': 3,
  'D': 2,
  'E': 1,
  'F': 4,
  'G': 2,
  'H': 4,
  'I': 1,
  'J': 8,
  'K': 5,
  'L': 1,
  'M': 3,
  'N': 1,
  'O': 1,
  'P': 3,
  'Q': 10,
  'R': 1,
  'S': 1,
  'T': 1,
  'U': 1,
  'V': 4,
  'W': 4,
  'X': 8,
  'Y': 4,
  'Z': 10


## How to run the project

INSTALL VIRTUALENV: pip install virtualenv
START VIRTUALENV POWERSHELL: virtualev . 
(first be sure to Set-ExecutionPolicy Unrestricted in powershell)
START VIRTUALENV GITBASH: python -m venv nameofVirtualenv
ACTIVATE VIRTUALENV POWERSHELL: ./Scripts/activate 
(sometimes . ./Scripts/activate)
ACTIVATE VIRTUALENV GITBASH: source virtualenvDIR/Scripts/activate
ACTIVATE VIRTUALENV MAC: source bin/activate
INSTALL DJANGO INSIDE VIRTUALENV: pip install django

Then unsure you are at the folder with manage.py in it and run:
python manage.py runserver

And later to deactivate the virtual environment once done:
DEACTIVATE VIRTUALENV: deactivate

## Credits
John Eldedr https://www.youtube.com/@Codemycom and @ https://codemy.com/, his playlist, and reference sheet.
Playlist https://youtube.com/playlist?list=PLCC34OHNcOtqW9BJmgQPPzUpJ8hl49AGy 
Reference sheet https://codemy.com/books/django-quick-reference-guide.pdf
Max Goodridge @ https://www.youtube.com/@MaxGoodridgeTech 
Video on saving forms https://youtu.be/qwE9TFNub84 
Free code camp: Code Tetris: JavaScript Tutorial for Beginners @ https://www.youtube.com/watch?v=rAUn1Lom6dw
