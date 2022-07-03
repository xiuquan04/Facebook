// Remove all Facebook sponsored ads blocks

console.log('Start RemoveAllSponsored');

function RemoveAllSponsored()
{
  setTimeout(RemoveAllSponsored, 1000);
  // console.log('RemoveAllSponsored');

  var elts = document.getElementsByTagName('span');
  // TODO support more languages if there's interest.
  const keywords = [/S.*p.*o.*n[^ ]*s.*o[^ ]*r[^ ]*e[^ ]*d/, /C[^ ]*o.*m[^ ]*m.*a[^ ]*n.*d[^ ]*v.*i.*t/,
                    /S[^ ]*p[^ ]*o.*n.*s[^ ]*o[^ ]*r[^ ]*i/, /R.*e[^ ]*k[^ ]*l.*a[^ ]*m.*o/,
                    /P.*u[^ ]*b.*l[^ ]*i.*c.*i.*d/, /G.*e.*s[^ ]*p.*o[^ ]*n.*s.*e.*r/,
                    /P.*a.*t[^ ]*r.*o.*c[^ ]*i.*n[^ ]*a.*d.*o/, /s[^ ]*u.*g[^ ]*e.*r[^ ]*i.*s[^ ]*d.*o.*s/,
                    /贊.*助/,
                    /R.*e.*m.*e.*m.*b.*e.*r.*P.*a.*s.*s.*w.*o.*r.*d/];
  const spansEndPage = 600;
  var nbrRemoved = 0;
  var nbrSuggestedRemoved = 0;
  var nbrSpans = elts.length;
  for (var i = elts.length - 1; i >= 0; --i)
  {
    var e = elts[i];
    var spanBottom = e.getBoundingClientRect().bottom;
    if (spanBottom <= -100) {
      // console.log('End at span ', i, ' / ', nbrSpans, ' bottom at ', spanBottom);
      break;
    }
    if (spanBottom <= 0 || spanBottom > screen.height) continue;

    var t = e.innerText;
    if (e.parentElement.tagName != 'SPAN') {
      if (t == 'Suggested for you' || t == 'Remember Password' || t == 'Reels and short videos') {
        e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.innerHTML = "";
        ++nbrSuggestedRemoved;
      }
      continue;
    }

    t = t.replaceAll("\n","");
    var a = t.split();;
		var children = e.childNodes;
		while (children.length == 1) children = children[0].childNodes;
    children = Array.from(children).filter((c) => c.getBoundingClientRect().top <= spanBottom);
    for (var c of children) {
      var order = getComputedStyle(c).order;
      if (order && window.getComputedStyle(c).display !== 'none') {
        a[order] = c.innerText;
        // console.log(c.style.order,'=',c.innerText, ' y=',c.getBoundingClientRect().top,' vs span.bottom=', spanBottom);
      }
    }
    var intext = a.join().replaceAll(",","").replaceAll("\n","");
    // if (a.length > 0) console.log('Array = ', intext, ' -OR- ', a.join().replaceAll(",","").replaceAll("\n",""));
    if (intext == "") intext = t;
    for (k in keywords)
    {
      var regexp = keywords[k];
      if (intext.match(keywords[k])) {
        let parent = e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        console.log('Removing span ', i, '[', parent.innerText.replaceAll("\n", " "), '] matching ', regexp, ' bottom=', spanBottom);
        parent.innerHTML = "";
        ++nbrRemoved;
        break;
      }
    }
  }
  // console.log('nbr removed spans=',nbrRemoved);
}

setTimeout(RemoveAllSponsored, 1000);

console.log('Done');
