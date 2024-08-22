function goto(loc) {
   document.getElementById(loc).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function collapseSection(element) {
   if (element.getAttribute('data-collapsed') === 'false') {
      let sectionHeight = element.scrollHeight;

      // temporarily disable all css transitions
      let elementTransition = element.style.transition;
      element.style.transition = '';

      // on the next frame (as soon as the previous style change has taken effect),
      // explicitly set the element's height to its current pixel height, so we 
      // aren't transitioning out of 'auto'
      requestAnimationFrame(function () {
         element.style.height = sectionHeight + 'px';
         element.style.transition = elementTransition;

         // on the next frame (as soon as the previous style change has taken effect),
         // have the element transition to height: 0
         requestAnimationFrame(function () {
            element.style.height = 0 + 'px';
         });
      });

      // mark the section as "currently collapsed"
      element.setAttribute('data-collapsed', 'true');
   }
}

function expandSection(element) {
   // only do things if it's done for
   // else weird things happen because there is no transitionend
   if (element.getAttribute('data-collapsed') === 'true') {
      let sectionHeight = element.scrollHeight;

      // have the element transition to the height of its inner content
      element.style.height = sectionHeight + 'px';

      // when the next css transition finishes (which should be the one we just triggered)
      element.addEventListener('transitionend', function () {
         // remove this event listener so it only gets triggered once
         element.removeEventListener('transitionend', arguments.callee);

         // remove "height" from the element's inline styles, so it can return to its initial value
         element.style.height = "auto";
      });

      // mark the section as "currently not collapsed"
      element.setAttribute('data-collapsed', 'false');
   }
}

function expand(change, sibling) {
   if (change.firstElementChild !== null) {
      if (change.firstElementChild.innerText === "+") {
         change.firstElementChild.innerText = "-";
      }
      else {
         change.firstElementChild.style["opacity"] = "100%";
      }
   }
   expandSection(sibling);
   change.style["font-style"] = "normal";
}

function collapse(change, sibling) {
   if (change.firstElementChild !== null) {
      if (change.firstElementChild.innerText === "-") {
         change.firstElementChild.innerText = "+";
      }
      else if (change.firstElementChild.innerText !== "+") {
         change.firstElementChild.style["opacity"] = "0";
      }
   }
   collapseSection(sibling);
   change.style["font-style"] = "italic";
}

function apply_all(fn) {
   for (let elem of document.getElementsByClassName("courses-title"))
      fn(elem, elem.nextElementSibling);
   for (let elem of document.getElementsByClassName("block-title"))
      fn(elem, elem.nextElementSibling);
}

function toggle(elem_id) {
   let change = document.getElementById(elem_id);
   let sibling = change.nextElementSibling;
   if (sibling.getAttribute('data-collapsed') === 'true')
      expand(change, sibling);
   else collapse(change, sibling);
}

window.addEventListener("load", () => {
   for (let elem of document.getElementsByClassName("resume-block")) {
      elem.setAttribute('data-collapsed', 'false');
   }
   for (let elem of document.getElementsByClassName("course-list")) {
      elem.setAttribute('data-collapsed', 'true');
   }
   // assign toggle triggers
   for (let elem of document.getElementsByClassName("block-title")) {
      // make sure elem_id is evaluated else lazy evaluation bug
      let change_id = elem.getAttribute("id");
      elem.onclick = () => toggle(change_id);
   }
   for (let elem of document.getElementsByClassName("courses-title")) {
      let change_id = elem.getAttribute("id");
      elem.onclick = () => toggle(change_id);
   }

   let curr_page = document.getElementById("curr_page");
   for (let elem of document.getElementsByClassName("navlink")) {
      elem.onmouseenter = () => curr_page.style["text-decoration"] = "none";
      elem.onmouseleave = () => curr_page.style["text-decoration"] = "underline";
   }
}, true);