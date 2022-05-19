<script>
  export let to = '/', text = '', active = true;
  import { Link } from 'svelte-routing';

  const getProps = ({location, href}) => {
    return (location.pathname === href) && active ? { class: 'link active'} : {class: 'link'};
  };
</script>

<Link {to} {getProps}>
  {text}
</Link>

<style>
  :global(.link) {
    padding: .5rem 1rem;
  }

  :global(.active) {
    border-bottom: navy .3rem solid;
  }
</style>